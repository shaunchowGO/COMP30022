import React from 'react';
import '../css/pages/Group.css'
import Footer from './Footer.js'
import {Link} from 'react-router-dom';
import AddItem from './AddItem.js'

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

  const [trigger, SetTrigger] = React.useState(false);

  return (
    <div>
      <AddItem trigger={trigger} SetTrigger={() => SetTrigger(!trigger)} info={{name: "Assignment"}}/>
      <section id="group">
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-info-right">
                <h1>{groupData.name}</h1>
                <p>Subject Name: {groupData.subjectName}</p>
                <button className="blue-btn" onClick={() => SetTrigger(!trigger)}>+ Add Assignments</button>
              </div>
            </div>
  
            <div className="table">
              <div className="search-container">
                <input type="text" id="search" placeholder="Search Documents"/>
              </div>
              <div className="table-header">
                  <p>Assignment Name</p>
                  <p>Start Date</p>
                  <p>Due Date</p>
                  <p>Detail</p>
              </div>
              <div className="table-content">
                {groupData.assignments.map((assignment, index) => (
                  <div className="table-row" key={index}>
                    <div className="file-name">{assignment.name}</div>
                    <div>{assignment.startDate}</div>
                    <div>{assignment.dueDate}</div>
                    <div className="row-detail">
                    <Link to="/assignment">
                      <img src={require(`../assets/images/icons/view_icon.png`)}></img>
                    </Link>
                    <img src={require(`../assets/images/icons/bin_icon.png`)}></img>
                    </div>
                  </div>
                ))}
              </div>
  
            </div>
  
          </div>
  
          <div className="profile-dashboard">
            <h1>Average Score</h1>
              <img src={require(`../assets/images/graph.png`)}></img>
              <div className="dashboard-info">
                <div className="stats">
                  <h1>6</h1>
                  <p>Total Documents</p>
                </div>
                <div className="stats">
                  <h1>4</h1>
                  <p>High Similarities</p>
                </div>
                <div className="stats">
                  <h1>3</h1>
                  <p>Late Submissions</p>
                </div>
                <div className="stats">
                  <h1>0</h1>
                  <p>Original Texts</p>
                </div>
              </div>
          </div>
        </section>
        <Footer/>
    </div>
  );
}

export default GroupProfile;
