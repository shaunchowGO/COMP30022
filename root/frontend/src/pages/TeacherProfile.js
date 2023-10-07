import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { getTeacherProfile } from '../utils/api';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer.js'
import Filter from './Filter.js'
import AddItem from './AddItem.js'
import '../css/pages/Teacher.css'

function TeacherProfile() {
  const teacherData = {
    name: 'Eduardo Riveria',
    id: 129312,
    classroomDetails: [
      {
        name: 'IT Project',
        id: 'COMP30022',
        assignmentNo: 3,
        studentNo: '28',
      },  
  ],
    displayPicture: 'eduardo.jpeg',
  };
  
  const [teacherData1, setTeacherData] = useState(null);
  useEffect(() => {
    async function retrieveTeacherInfo(){
      const data = await getTeacherProfile();
      console.log('Retrieving Teacher Data...')
      setTeacherData(data);
      
    }
    retrieveTeacherInfo();
  }, []);
  console.log('Teacher data:' ,teacherData1)


  const [trigger, SetTrigger] = React.useState(false);
  return (
    <div >
      <section id="teacher">
        <AddItem trigger={trigger} SetTrigger={() => SetTrigger(!trigger)} info={{name: "Subject"}} hasID={true}/>
        <div className="profile-container">
          <div className="profile-info">
            <img src={require(`../assets/images/${teacherData.displayPicture}`)} alt="Profile" />
            <div className="profile-info-right">
              <h1>{teacherData.name}</h1>
              <p>Academic ID: {teacherData.id}</p>
              <div className="btn-container">
                <button className="blue-btn" onClick={() => SetTrigger(!trigger)}>+ Add Classroom</button>
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
              {teacherData.classroomDetails.map((classroom, index) => (
                <div className="table-row" key={index}>
                  <div className="file-name">{classroom.name}</div>
                  <div className="file-name">{classroom.id}</div>
                  <div>{classroom.assignmentNo}</div>
                  <div>{classroom.studentNo}</div>
                  <div className="row-detail">
                      <Link to="/group">
                        <FontAwesomeIcon className="icon" icon={faEye}/>
                      </Link>
                    <FontAwesomeIcon className="icon" icon={faTrash} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <Filter buttonLabels={["Subject", "ID", "No. Assignments", "No. Students"]}/> */}
      </section>
      <Footer/>
    </div>
  );
}

export default TeacherProfile;
