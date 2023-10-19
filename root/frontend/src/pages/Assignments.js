import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import Import from './Import.js'
import Footer from './Footer.js'
import Filter from './Filter.js'
import { getStudentAssignmentInfo, getAssignmentInfo, getSubjectInfo, getSubjectStudents } from '../utils/api.js';
import '../css/pages/Assignment.css'
import RotateLoader from "react-spinners/RotateLoader";


function GroupProfile() {

  const [studentData, setStudentData] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstRequest, setFirstRequest] = useState(true);
  const [importTrigger, SetImportTrigger] = React.useState(false);
  const { ID } = useParams();
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const [subjectStudent, setSubjectStudent] = React.useState();
 
  useEffect(() => {
    async function fetchData() {
      setFirstRequest(true)
      try {
        const students = await getStudentAssignmentInfo(ID);
        const submissions = await getAssignmentInfo(ID);

        setStudentData(students);
        setSubmissionData(submissions);
        console.log(submissionData)

        setFirstRequest(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFirstRequest(false);
        setIsLoading(false)
      }
 
    }

    fetchData();
  }, [ID]);
  console.log('loading 1:', isLoading)
  
  useEffect(() => {
    async function fetchSubjectData() {
      console.log('loading:', isLoading)
      if (!firstRequest){ 
        const subjectID = submissionData[0].SubjectId
        console.log('subjectID:', subjectID)
      
        if (subjectID){
          try {

            const subject = await getSubjectInfo(subjectID)
            const studentData1 = await getSubjectStudents(subjectID);
            setSubjectData(subject)
            setSubjectStudent([studentData1]);


            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
          }
        }
      }
    }
    if (!firstRequest){
      fetchSubjectData();
    }
  }, [firstRequest]);
  

  const handleViewDocument = () => {
    setShowDocumentViewer(true);
  }
  if (isLoading){
    return(
      <div>
        <section id="group-spinner">
        <div className="loading-container">
          <RotateLoader color="#7179e7" />
        </div>
      </section>
      </div>
    );
  }
  if (!isLoading && subjectStudent) {
    console.log('submission :', submissionData)
    console.log('stuent data',studentData)
    console.log('subjectData: ', subjectData)
    console.log('subjectStudent:', subjectStudent);
    const updatedStudentData = studentData.map(student => ({
      ...student,
      studentId: subjectStudent.Id,
      subjectName: subjectData.Name
    }));
    console.log('updatedStudentData', updatedStudentData)
    return (
      <div>
        <section id="assignment">
        <Import
            trigger={importTrigger}
            SetImportTrigger={() => SetImportTrigger(!importTrigger)}
            isCompare={true}
            studentID={updatedStudentData.studentId}
            assignmentID={ID}
            subjectName={updatedStudentData.subjectName}
            data={subjectStudent}
          />
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-info-right">
                <h1>{submissionData[0].SubjectId}</h1>
                <p>Assignment for: {submissionData[0].Name}</p>
                <button
                  className="blue-btn"
                  onClick={() => SetImportTrigger(!importTrigger)}
                >
                  + Add Submission
                </button>
              </div>
            </div>

            <div className="table">
              <div className="table-header">
                <p>Student Name</p>
                <p>Similarity Score</p>
                <p>Date Added</p>
                <p>Details</p>
              </div>
              <div className="table-content">
                {updatedStudentData.map((assignment, index) => (
                  <div className="table-row" key={index}>
                    <div className="file-name">{assignment.Name}</div>
                    <div>{assignment.similarityScore}%</div>
                    <div>{assignment.Date}</div>
                    <div className="row-detail">
                      <Link to={`/student/${assignment.studentId}`}>
                        <FontAwesomeIcon className="icon" icon={faEye} />
                      </Link>
                      <FontAwesomeIcon className="icon" icon={faTrash} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <Filter buttonLabels={["Student Name", "Similarity Score", "Date Added"]} hasScore={true}/> */}
        </section>
        <Footer />
      </div>
    );
}
}

export default GroupProfile;
