import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeacherPage, getTeacherProfile } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer.js";
import AddItem from "./AddItem.js";
import RotateLoader from "react-spinners/RotateLoader";

import "../css/pages/Teacher.css";

function TeacherProfile(props) {
	const [teacherInfo, setTeacherInfo] = useState(null);
	const [classroomData, setClassroomData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [trigger, SetTrigger] = React.useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const teacherData = await getTeacherProfile(props.academicID[0].Id);
				const classroomData = await getTeacherPage(props.academicID[0].Id);
				
				setTeacherInfo(teacherData);
				setClassroomData(classroomData);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div>
				<section id="teacher">
					<div className="loading-container">
						<RotateLoader color="#7179e7" />
					</div>
				</section>
			</div>
		);
	}

	if (!isLoading) {
		console.log("classroomData: ", classroomData);
		const teacherData = {
			name: teacherInfo.Name,
			id: teacherInfo.Id,
			classroomDetails: classroomData.map(row => ({
				name: row.Subject,
				id: row.SubjectID,
				assignmentNo: row.Assignments,
				studentNo: row.Students,
			})),
		};
		console.log("teacherdata: ", teacherData);

    return (
      <div>
        <section id="teacher">
          <AddItem
            trigger={trigger}
            SetTrigger={() => SetTrigger(!trigger)}
            info={{ name: "Classroom", ID:props.academicID[0].Id }}
            hasID={true}
            manageAlert={props.manageAlert}
            inputData={props.academicID[0].Id}
			getFunction={getTeacherPage}
            setNewData={setClassroomData}
          />
          <div className="profile-container">
            <div className="profile-info">
              <img
                src={require(`../assets/images/${"profile.png"}`)}
                alt="Profile"
              />
              <div className="profile-info-right">
                <h1>{teacherData.name}</h1>
                <p>Academic ID: {teacherData.id}</p>
                <div className="btn-container">
                  <button
                    className="blue-btn"
                    onClick={() => SetTrigger(!trigger)}
                  >
                    + Add Classroom
                  </button>
                </div>
              </div>
            </div>

						<div className="table">
							<div className="table-header">
								<p>Subject</p>
								<p>ID</p>
								<p>No. of Assignments</p>
								<p>No. of Students</p>
								<p>Detail</p>
							</div>
							<div className="table-content">
								{teacherData &&
									teacherData.classroomDetails.map((classroom, index) => (
										<div className="table-row" key={index}>
											<div className="file-name">{classroom.name}</div>
											<div className="file-name">{classroom.id}</div>
											<div>{classroom.assignmentNo}</div>
											<div>{classroom.studentNo}</div>
											<div className="row-detail">
												<Link to={`/group/${classroom.id}`}>
													<FontAwesomeIcon className="icon" icon={faEye} />
												</Link>
												{/* <FontAwesomeIcon className="icon" icon={faTrash} /> */}
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</div>
		);
	}
}

export default TeacherProfile;
