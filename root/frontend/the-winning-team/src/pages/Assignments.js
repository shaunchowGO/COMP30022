import React from 'react';
import '../css/Group.css'
import Footer from './Footer.js'

function GroupProfile() {
  const groupData = {
    filename: 'COMP30022_Assignment_1',
    subjectName: 'IT Project',
    assignments: [
      {
        name: 'Rohit Ambakkat',
        status: 'Late',
        score: 45,
        date: 'Aug 10, 2022',
      },
    ],
  };

  return (
    <div>
      <section id="profile">
          <div className="profile-container">
            <div className="profile-info">
              <div className="profile-info-right">
                <h1>{groupData.filename}</h1>
                <p>Assignment for: {groupData.subjectName}</p>
                <button className="blue-btn">+ Add Document</button>
              </div>
            </div>
  
            <div className="table">
              <div className="search-container">
                <input type="text" id="search" placeholder="Search Documents"/>
              </div>
              <div className="table-header">
                  <p>Student Name</p>
                  <p>Status</p>
                  <p>Score</p>
                  <p>Submission Date</p>
              </div>
              <div className="table-content">
                {groupData.assignments.map((assignment, index) => (
                  <div className="table-row" key={index}>
                    <div className="file-name">{assignment.name}</div>
                    <div>{assignment.status}</div>
                    <div>{assignment.score}%</div>
                    <div>{assignment.date}</div>
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
