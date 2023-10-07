import React, { useEffect, useState } from 'react';
import { getStudentProfile } from '../utils/api.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash, faDownload} from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer.js'
import Import from './Import.js'
import Filter from './Filter.js'
import '../css/pages/Profile.css'

function StudentProfile() {
  const studentData = {
    name: 'Rohit Ambakkat',
    studentNumber: 129312,
    assignmentDetails: [
      {
      name: 'COMP30022_Assignment1',
      group: 'COMP30022',
      date: 'Sep 9, 2023',
      simScore: 92,
      },  
  ],
    displayPicture: 'profile_img.jpg',
  };


  const [studentData1, setStudentData] = useState(null);

  useEffect(() => {
    async function retrieveStudentInfo(){
      const data = await getStudentProfile();
      console.log('Retrieving Student Data...')
      setStudentData(data);
      
    }
    retrieveStudentInfo();
  }, []);

  const [importTrigger, SetImportTrigger] = React.useState(false);

  return (
    <div>
        <section id="profile">
          <Import trigger={importTrigger} SetImportTrigger={() => SetImportTrigger(!importTrigger)}/>
          <div className="profile-container">
            <div className="profile-info">
              <img src={require(`../assets/images/${studentData.displayPicture}`)} alt="Profile" />
              <div className="profile-info-right">
                <h1>{studentData1 !== null ? studentData1[0].Name : "Loading..."}</h1>
                <p>Student ID: {studentData1 !== null ? studentData1[0].Id : "Loading..."}</p>
                <button className="blue-btn" onClick={() => SetImportTrigger(!importTrigger)}>+ Add Document</button>
              </div>
            </div>

            <div className="table">
              <div className="table-header">
                  <p>File Name</p>
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
                      <FontAwesomeIcon className="icon" icon={faTrash} />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
          {/* <Filter buttonLabels={["Assignment Name", "Subject Name", "Similarity Score", "Date Added"]} hasScore={true}/> */}
        </section>
      <Footer/>
    </div>
  );
}

export default StudentProfile;
