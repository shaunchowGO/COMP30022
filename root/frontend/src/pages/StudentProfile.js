import React from 'react';
import { getStudentProfile } from '../utils/api.js';
import Footer from './Footer.js'
import Import from './Import.js'
import '../css/pages/Profile.css'

function StudentProfile() {
  const studentData = {
    name: 'Rohit Ambakkat',
    studentNumber: 129312,
    assignmentDetails: [
      {
      name: 'COMP3022_Assignment1_129312',
      group: 'COMP30022',
      date: 'Sep 9, 2023',
      simScore: 92,
      },  
  ],
    displayPicture: 'profile_img.jpg',
  };


  const [importTrigger, SetImportTrigger] = React.useState(false);

  return (
    <div >
      <section id="profile">
        <Import trigger={importTrigger} SetImportTrigger={() => SetImportTrigger(!importTrigger)}/>
        <div className="profile-container">
          <div className="profile-info">
            <img src={require(`../assets/images/${studentData.displayPicture}`)} alt="Profile" />
            <div className="profile-info-right">
              <h1>{studentData.name}</h1>
              <p>Student Number: {studentData.studentNumber}</p>
              <button className="blue-btn" onClick={() => SetImportTrigger(!importTrigger)}>+ Add Document</button>
            </div>
          </div>

          <div className="table">
            <div className="search-container">
              <input type="text" id="search" placeholder="Search Documents"/>
            </div>
            <div className="table-header">
                <p>Assignment Name</p>
                <p>Subject</p>
                <p>Score</p>
                <p>Submission Date</p>
                <p>Details</p>
            </div>
            <div className="table-content">
              {studentData.assignmentDetails.map((assignment, index) => (
                <div className="table-row" key={index}>
                  <div className="file-name">{assignment.name}</div>
                  <div>{assignment.group}</div>
                  <div>{assignment.simScore}%</div>
                  <div>{assignment.date}</div>
                  <div className="row-detail">
                    <img src={require(`../assets/images/icons/download_icon.png`)}></img>
                    <img src={require(`../assets/images/icons/view_icon.png`)}></img>
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

export default StudentProfile;
