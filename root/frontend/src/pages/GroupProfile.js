import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSubjectInfo, getSubjectPage } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer.js";
import AddItem from "./AddItem.js";
import "../css/pages/Group.css";
import RotateLoader from "react-spinners/RotateLoader";

function GroupProfile(props) {
  const groupData1 = {
    name: "COMP30022",
    subjectName: "IT Project",
    assignments: [
      {
        name: "Sample Assignment 1",
        startDate: "Aug 9, 2023",
        dueDate: "Sep 9, 2023",
        date: "Aug 10, 2022",
      },
      {
        name: "Sample Assignment 2",
        startDate: "Aug 9, 2023",
        dueDate: "Sep 9, 2023",
        date: "Aug 10, 2022",
      },
      {
        name: "Sample Assignment 3",
        startDate: "Aug 9, 2023",
        dueDate: "Sep 9, 2023",
        date: "Aug 10, 2022",
      },
      {
        name: "Sample Assignment 3",
        startDate: "Aug 9, 2023",
        dueDate: "Sep 9, 2023",
        date: "Aug 10, 2022",
      },
    ],
  };
  const studentData = {
    details: [
      {
        id: 1167144,
        name: "Thaya Chevaphatrakul",
      },
      {
        id: 1152451,
        name: "Rohit Sandeep",
      },
      {
        id: 1152451,
        name: "Rohit Sandeep",
      },
      {
        id: 1152451,
        name: "Rohit Sandeep",
      },
      {
        id: 1152451,
        name: "Rohit Sandeep",
      },
      {
        id: 1152451,
        name: "Rohit Sandeep",
      },
    ],
  };
  const { ID } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function retrieveGroupInfo() {
      setIsLoading(true);
      try{
        const groupData = await getSubjectPage(ID);
        const subjectData = await getSubjectInfo(ID)
        console.log("Retrieving getSubjectPage Data... ",ID);

        setGroupData(groupData);
        setSubjectData(subjectData);
        setIsLoading(false);
      } catch (error){
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }
    retrieveGroupInfo();
  }, []);

  const [viewingAssignments, SetViewingAssignments] = React.useState(true);
  const [trigger, SetTrigger] = React.useState(false);


  if (isLoading){
    console.log("test");
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
    console.log("Group data:", groupData);
    console.log('subject data:', subjectData)
    return (
      <div>
        {viewingAssignments ? (
          <AddItem
            trigger={trigger}
            SetTrigger={() => SetTrigger(!trigger)}
            hasID={true}
            hasDate={true}
            info={{ name: "Assignment" }}
            manageAlert={props.manageAlert}
          />
        ) : (
          <AddItem
            trigger={trigger}
            SetTrigger={() => SetTrigger(!trigger)}
            hasID={true}
            info={{ name: "Students" }}
            manageAlert={props.manageAlert}
          />
        )}
        <section id="group">
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-info-right">
                <h1>{subjectData[0].Id}</h1>
                <p>Subject Name: {subjectData[0].Name}</p>
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
													<FontAwesomeIcon className="icon" icon={faTrash} />
												</div>
											</div>
										))}
								</div>
							) : (
								<div className="card-content">
									{studentData.details.map((student, index) => (
										<div className="card" key={index}>
											<img src={require("../assets/images/registered.png")}></img>
											<p className="card-id">{student.id}</p>
											<h3 className="file-name">{student.name}</h3>
											<div className="card-detail">
												<div className="card-detail-icon">
													<FontAwesomeIcon className="icon" icon={faEye} />
													<FontAwesomeIcon className="icon" icon={faTrash} />
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
					{/* {viewingAssignments ?
              <Filter buttonLabels={["Assignment Name"]}/>
              :
              <Filter buttonLabels={["ID", "Student Name"]}/>
            } */}
				</section>
				<Footer />
			</div>
		);
	}
}

export default GroupProfile;
