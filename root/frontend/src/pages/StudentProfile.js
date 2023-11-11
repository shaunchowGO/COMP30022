import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStudentProfile, getStudentFiles, getAllStudentProfile } from "../utils/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer.js";
import Import from "./Import.js";
import RotateLoader from "react-spinners/RotateLoader";
import "../css/pages/Profile.css";

function StudentProfile() {
	const { ID } = useParams();
	const [studentInfo, setStudentInfo] = React.useState(null);
	const [assignmentInfo, setAssignmentInfo] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [importTrigger, SetImportTrigger] = React.useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const allStudents = await getAllStudentProfile();
				console.log(allStudents)
				const studentData = await getStudentProfile(ID);
				console.log(studentData, "data")
				setStudentInfo(studentData);
				const assignmentData = await getStudentFiles(ID);
				console.log(assignmentData, "student stuff");
				if (assignmentData == null) {
					setAssignmentInfo([]);
				}
				else {
					setAssignmentInfo(assignmentData);
				}

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		}

		fetchData();
	}, [ID]);

	if (isLoading) {
		return (
			<div>
				<section id="profile">
					<div className="loading-container">
						<RotateLoader color="#7179e7" />
					</div>
				</section>
				<Footer />
			</div>
		);
	}

	if (!isLoading) {
		console.log(studentInfo, "assignment stuff 0")
		console.log(studentInfo[0], "assignment stuff 1")
		const studentData = {
			name: studentInfo[0].Name,
			id: studentInfo[0].Id,
			assignmentDetails: assignmentInfo.map(assignment => ({
				name: assignment.Name,
				group: assignment.Subject,
				date: assignment.Date,
				simScore: assignment.SimilarityScore,
			})),
		};
		console.log("student data: ", studentData);
	console.log(studentData)
    return (
      <div>
        <section id="profile">
			<Import
				trigger={importTrigger}
				SetImportTrigger={() => SetImportTrigger(!importTrigger)}
				studentID={ID}
				assignmentID={100}
				subjectName="Arts"
			/>
          <div className="profile-container">
            <div className="profile-info">
              <img
                src={require(`../assets/images/${"profile.png"}`)}
                alt="Profile"
              />
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
								{/* <FontAwesomeIcon className="icon" icon={faTrash} /> */}
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
