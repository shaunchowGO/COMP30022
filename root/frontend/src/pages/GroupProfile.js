import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {getAssignmentInfo} from '../utils/api'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer.js'
import AddItem from './AddItem.js'
import Filter from './Filter.js'
import '../css/pages/Group.css'

function GroupProfile() {
  const groupData = {
    name: 'COMP30022',
    subjectName: 'IT Project',
    assignments: [
      {
        name: 'Sample Assignment 1',
        startDate: 'Aug 9, 2023',
        dueDate: 'Sep 9, 2023',
        date: 'Aug 10, 2022',
      },
      {
        name: 'Sample Assignment 2',
        startDate: 'Aug 9, 2023',
        dueDate: 'Sep 9, 2023',
        date: 'Aug 10, 2022',
      },
      {
        name: 'Sample Assignment 3',
        startDate: 'Aug 9, 2023',
        dueDate: 'Sep 9, 2023',
        date: 'Aug 10, 2022',
      },
      {
        name: 'Sample Assignment 3',
        startDate: 'Aug 9, 2023',
        dueDate: 'Sep 9, 2023',
        date: 'Aug 10, 2022',
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

  const [groupData1, setGroupData] = useState(null);
 
  useEffect(() => {
    async function retrieveGroupInfo(){
      const data = await getAssignmentInfo();
      console.log('Retrieving Group Data...')
      setGroupData(data);
      
    }
    retrieveGroupInfo();
  }, []);
  console.log('Group data:' ,groupData1)

  const [viewingAssignments, SetViewingAssignments] = React.useState(true);
  const [trigger, SetTrigger] = React.useState(false);

  return (
    <div>
      {viewingAssignments ? 
      <AddItem trigger={trigger} SetTrigger={() => SetTrigger(!trigger)} hasID={true} hasDate={true} info={{name: "Assignment"}}/>
      :
      <AddItem trigger={trigger} SetTrigger={() => SetTrigger(!trigger)} hasID={true} info={{name: "Students"}}/>
    }
      <section id="group">
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-info-right">
                <h1>{groupData.name}</h1>
                <p>Subject Name: {groupData.subjectName}</p>
                <div className="btn-containers">
                  {viewingAssignments ? <button className="blue-btn" onClick={() => SetTrigger(!trigger)}>+ Add Assignments</button> : <button className="blue-btn" onClick={() => SetTrigger(!trigger)}>+ Add Students</button>}
                  {viewingAssignments ?
                  <button className="view-btn" onClick={() => SetViewingAssignments(!viewingAssignments)}>View Students</button>
                  :
                  <button className="view-btn" onClick={() => SetViewingAssignments(!viewingAssignments)}>View Assignments</button>
                  }
                </div>
              </div>
            </div>
  
            <div className="table">
              {viewingAssignments ? 
                <div className="table-header">
                  <p>Assignment Name</p>
                  <p>Detail</p>
                </div>
                :
                <div className="table-header">
                  <p>Students</p>
                </div>
              }

              {viewingAssignments ? 
                <div className="table-content">
                  {groupData.assignments.map((assignment, index) => (
                    <div className="table-row" key={index}>
                      <div className="file-name">{assignment.name}</div>
                      <div className="row-detail">
                        <Link to="/assignment">
                          <FontAwesomeIcon className="icon" icon={faEye}/>
                        </Link>
                          <FontAwesomeIcon className="icon" icon={faTrash} />
                      </div>
                    </div>
                  ))}
                </div>
              :  
              <div className="card-content">
                  {studentData.details.map((student, index) => (
                    <div className="card" key={index}>
                      <img src={require("../assets/images/registered.png")}></img>
                      <p className="card-id">{student.id}</p>
                      <h3 className="file-name">{student.name}</h3>
                      <div className="card-detail">
                        <div className="card-detail-icon">
                          <FontAwesomeIcon className="icon" icon={faEye}/>
                          <FontAwesomeIcon className="icon" icon={faTrash} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
          {/* {viewingAssignments ?
            <Filter buttonLabels={["Assignment Name"]}/>
            :
            <Filter buttonLabels={["ID", "Student Name"]}/>
          } */}
        </section>
        <Footer/>
    </div>
  );
}

export default GroupProfile;
