import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import Import from './Import.js'
import Footer from './Footer.js'
import Filter from './Filter.js'
import { getStudentAssignmentInfo, getAssignmentInfo, getSubjectInfo } from '../utils/api.js';
import '../css/pages/Assignment.css'
import RotateLoader from "react-spinners/RotateLoader";


function GroupProfile() {

  const [studentData, setStudentData] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [importTrigger, SetImportTrigger] = React.useState(false);
  const { ID } = useParams();
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);


  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const students = await getStudentAssignmentInfo(ID);
        const submissions = await getAssignmentInfo(ID);

        setStudentData(students);
        setSubmissionData(submissions);

        const subject = await getSubjectInfo(submissionData[0].SubjectId)
        setSubjectData(subject)

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
 
    }

    fetchData();
  }, [ID]);

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
  if (!isLoading) {
    console.log('submission :', submissionData)
    console.log('stuent data',studentData)
    console.log('subjectData: ', subjectData)
    return (
      <div>
        <section id="assignment">
        {/* <Import
            trigger={importTrigger}
            SetImportTrigger={() => SetImportTrigger(!importTrigger)}
            studentID={academicID}
            assignmentID={100}
            subjectName="Arts"
          /> */}
          <Import
            trigger={importTrigger}
            SetImportTrigger={() => SetImportTrigger(!importTrigger)}
            isCompare={true}
            studentData={studentData}
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
                {studentData.map((assignment, index) => (
                  <div className="table-row" key={index}>
                    <div className="file-name">{assignment.Name}</div>
                    <div>{assignment.similarityScore}%</div>
                    <div>{assignment.Date}</div>
                    <div className="row-detail">
                      <Link to={`/student/${assignment.ID}`}>
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
