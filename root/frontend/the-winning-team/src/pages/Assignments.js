import React from 'react';
import '../css/pages/Assignment.css'
import Footer from './Footer.js'
import {Link} from 'react-router-dom';
import AddItem from './AddItem.js'

function GroupProfile() {
  const groupData = {
    filename: 'COMP30022_Assignment_1',
    subjectName: 'IT Project',
    dueDate: 'Aug 12, 2023',
    assignments: [
      {
        name: 'Rohit Ambakkat',
        filename: 'COMP3022_Assignment1_129312',
        score: 92,
        date: 'Sep 9, 2023',
      },
    ],
  };

  const [trigger, SetTrigger] = React.useState(false);
  return (
    <div>
      <section id="assignment">
        <AddItem trigger={trigger} SetTrigger={() => SetTrigger(!trigger)} info={{name: "Student"}}/>
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-info-right">
                <h1>{groupData.filename}</h1>
                <p>Assignment for: {groupData.subjectName}</p>
                <p>Due Date: {groupData.dueDate}</p>
                <button className="blue-btn" onClick={() => SetTrigger(!trigger)}>+ Add Student</button>
              </div>
            </div>
  
            <div className="table">
              <div className="search-container">
                <input type="text" id="search" placeholder="Search Documents"/>
              </div>
              <div className="table-header">
                  <p>Student Name</p>
                  <p>File Name</p>
                  <p>Score</p>
                  <p>Submission Date</p>
                  <p>Details</p>
              </div>
              <div className="table-content">
                {groupData.assignments.map((assignment, index) => (
                  <div className="table-row" key={index}>
                    <div className="file-name">{assignment.name}</div>
                    <div>{assignment.filename}</div>
                    <div>{assignment.score}%</div>
                    <div>{assignment.date}</div>
                    <div className="row-detail">
                      <img src={require(`../assets/images/icons/download_icon.png`)}></img>
                    <Link to="/student">
                      <img src={require(`../assets/images/icons/view_icon.png`)}></img>
                    </Link>
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
