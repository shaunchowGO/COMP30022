import React, { useEffect, useState } from "react";
import { getStudentProfile, getStudentAssignmentInfo } from "../utils/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer.js";
import Import from "./Import.js";
import RotateLoader from "react-spinners/RotateLoader";
import "../css/pages/Profile.css";

function StudentProfile() {
  const studentData1 = {
    name: "Rohit Ambakkat",
    studentNumber: 129312,
    assignmentDetails: [
      {
        name: "COMP30022_Assignment1",
        group: "COMP30022",
        date: "Sep 9, 2023",
        simScore: 92,
      },
    ],
    displayPicture: "profile_img.jpg",
  };

  const [studentInfo, setStudentInfo] = React.useState(null);
  const [assignmentInfo, setAssignmentInfo] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [importTrigger, SetImportTrigger] = React.useState(false);

  const academicID = 11111;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const studentData = await getStudentProfile(academicID);
        const assignmentData = await getStudentAssignmentInfo(academicID);

        setStudentInfo(studentData);
        setAssignmentInfo(assignmentData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [academicID]);
  console.log(assignmentInfo);
  if (isLoading) {
    return (
      <div>
        <section id="profile">
          <div className="loading-container">
            <RotateLoader color="#7179e7" />
          </div>
        </section>
      </div>
    );
  }

  if (!isLoading) {
    const studentData = {
      name: studentInfo[0].Name,
      id: studentInfo[0].Id,
      assignmentDetails: assignmentInfo.map((assignment) => ({
        name: assignment.ID,
        group: assignment.subjectName,
        date: assignment.Date,
        simScore: assignment.similarityScore,
      })),
    };
    console.log("student data: ", studentData);

    return (
      <div>
        <section id="profile">
          <Import
            trigger={importTrigger}
            SetImportTrigger={() => SetImportTrigger(!importTrigger)}
            studentID={academicID}
            assignmentID={100}
            subjectName="Arts"
          />
          <div className="profile-container">
            <div className="profile-info">
              <img src={require(`../assets/images/${'profile.png'}`)} alt="Profile" />
              <div className="profile-info-right">
                <h1>{studentData.name}</h1>
                <p>Student ID: {studentData.id}</p>
                <button
                  className="blue-btn"
                  onClick={() => SetImportTrigger(!importTrigger)}
                >
                  + Add Document
                </button>
              </div>
            </div>

            <div className="table">
              <div className="table-header">
                <p>Assignment Name</p>
                <p>Subject</p>
                <p>Similarity Score</p>
                <p>Date Added</p>
                <p>Detail</p>
              </div>

              <div className="table-content">
                {studentData.assignmentDetails.map((assignment, index) => (
                  <div className="table-row" key={index}>
                    <div className="file-name">{assignment.name}</div>
                    <div>{assignment.group}</div>
                    <div>{assignment.simScore}%</div>
                    <div>{assignment.date}</div>
                    <div className="row-detail">
                      <FontAwesomeIcon className="icon" icon={faDownload} />
                      <FontAwesomeIcon className="icon" icon={faTrash} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <Filter buttonLabels={["Assignment Name", "Subject Name", "Similarity Score", "Date Added"]} hasScore={true}/> */}
        </section>
        <Footer />
      </div>
    );
  }
}

export default StudentProfile;
