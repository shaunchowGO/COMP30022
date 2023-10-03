import React, { useEffect, useState } from 'react';
import '../css/pages/Group.css'
import Footer from './Footer.js'
import {Link} from 'react-router-dom';
import AddItem from './AddItem.js'
import {getAssignmentInfo} from '../utils/api'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';

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
      <AddItem trigger={trigger} SetTrigger={() => SetTrigger(!trigger)} info={{name: "Assignment"}}/>
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
              <div className="search-container">
                <input type="text" id="search" placeholder="Search Documents"/>
              </div>
              {viewingAssignments ? 
                <div className="table-header">
                  <p>Assignment Name</p>
                  <p>Detail</p>
                </div>
                :
                <div className="table-header">
                  <p>Student ID</p>
                  <p>Student Name</p>
                  <p>Detail</p>
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
              <div className="table-content">
                  {studentData.details.map((student, index) => (
                    <div className="table-row" key={index}>
                      <div className="file-name">{student.id}</div>
                      <div className="file-name">{student.name}</div>
                      <div className="row-detail">
                      <Link to="/assignment">
                        <FontAwesomeIcon className="icon" icon={faEye}/>
                      </Link>
                        <FontAwesomeIcon className="icon" icon={faTrash} />
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
  
          <div className="profile-dashboard">
            <h2>Dashboard</h2>
            <img src={require(`../assets/images/graph.png`)}></img>
            <div className="breaker"></div>
            <div className="dashboard-info">
              <div className="stats">
                <h1>3</h1>
                <p>Total Assignments</p>
              </div>
              <div className="stats">
                <h1>56</h1>
                <p>Total Students</p>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
    </div>
  );
}

export default GroupProfile;
