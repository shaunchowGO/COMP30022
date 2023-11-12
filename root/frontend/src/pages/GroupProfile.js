import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubjectInfo, getSubjectPage, getSubjectStudents } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer.js";
import AddItem from "./AddItem.js";
import "../css/pages/Group.css";
import RotateLoader from "react-spinners/RotateLoader";

function GroupProfile(props) {
  const { ID } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subjectStudent, setSubjectStudent] = useState();
  useEffect(() => {
    async function retrieveGroupInfo() {
      setIsLoading(true);
      try{
        const groupData = await getSubjectPage(ID);
        const subjectData = await getSubjectInfo(ID)
        const student = await getSubjectStudents(ID);
        console.log("Retrieving getSubjectPage Data... ",ID);

        setSubjectStudent(student)
        setGroupData(groupData);
        setSubjectData(subjectData);
        setIsLoading(false);
      } catch (error){
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    retrieveGroupInfo();
  }, [ID]);
  const [viewingAssignments, SetViewingAssignments] = React.useState(true);
  const [trigger, SetTrigger] = React.useState(false);


  if (isLoading){
    return(
      <div>
        <section id="group">
        <div className="loading-container">
          <RotateLoader color="#7179e7" />
        </div>
      </section>
      <Footer />
      </div>
    );
  }

  if (!isLoading) {
    return (
      <div>
        {viewingAssignments ? (
          <AddItem
            trigger={trigger}
            SetTrigger={() => SetTrigger(!trigger)}
            info={{ name: "Assignment" }}
            hasDate={true}
            subjectID={subjectData.Id}
            inputData={ID}
            manageAlert={props.manageAlert}
            getFunction={getSubjectPage}
            setNewData={setGroupData}
          />
        ) : (
          <AddItem
            trigger={trigger}
            SetTrigger={() => SetTrigger(!trigger)}
            hasID={true}
            info={{ name: "Students" }}
            manageAlert={props.manageAlert}
            inputData={ID}
            subjectID={subjectData.Id}
			      getFunction={getSubjectStudents}
            setNewData={setSubjectStudent}
          />
        )}
        <section id="group">
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-info-right">
                <h1>{subjectData.Id}</h1>
                <p>Subject Name: {subjectData.Name}</p>
                <div className="btn-containers">
                  {viewingAssignments ? (
                    <button
                      className="blue-btn"
                      onClick={() => SetTrigger(!trigger)}
                    >
                      + Add Assignments
                    </button>
                  ) : (
                    <button
                      className="blue-btn"
                      onClick={() => SetTrigger(!trigger)}
                    >
                      + Add Students
                    </button>
                  )}
                  {viewingAssignments ? (
                    <button
                      className="view-btn"
                      onClick={() => SetViewingAssignments(!viewingAssignments)}
                    >
                      View Students
                    </button>
                  ) : (
                    <button
                      className="view-btn"
                      onClick={() => SetViewingAssignments(!viewingAssignments)}
                    >
                      View Assignments
                    </button>
                  )}
                </div>
              </div>
            </div>

						<div className="table">
							{viewingAssignments ? (
								<div className="table-header">
									<p>Assignment Name</p>
									<p>Detail</p>
								</div>
							) : (
								<div className="table-header">
									<p>Students</p>
								</div>
							)}

							{viewingAssignments ? (
								<div className="table-content">
									{groupData &&
										groupData.map((assignment, index) => (
											<div className="table-row" key={index}>
												<div className="file-name">{assignment.Name}</div>
												<div className="row-detail">
													<Link to={`/assignment/${assignment.ID}`}>
														<FontAwesomeIcon className="icon" icon={faEye} />
													</Link>
												</div>
											</div>
										))}
								</div>
							) : (
								<div className="card-content">
									{subjectStudent.map((student, index) => (
										<div className="card" key={index}>
											<img src={require("../assets/images/registered.png")}></img>
											<p className="card-id">{student.Id}</p>
											<h3 className="file-name">{student.Name}</h3>
											<div className="card-detail">
												<div className="card-detail-icon">
                          <Link to={`/student/${student.Id}`}>
                            <FontAwesomeIcon className="icon" icon={faEye} />
                          </Link>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</section>
				<Footer />
			</div>
		);
	}
}

export default GroupProfile;
