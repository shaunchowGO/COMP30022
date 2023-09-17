import React, { useEffect, useState } from 'react';
import '../css/pages/Teacher.css'
import Footer from './Footer.js'
import AddItem from './AddItem.js'

function TeacherProfile() {
  const teacherData1 = {
    name: 'Eduardo Riveria',
    id: 129312,
    classroomDetails: [
      {
        name: 'COMP30022',
        assignmentNo: 3,
        studentNo: '28',
      },  
  ],
    displayPicture: 'eduardo.jpeg',
  };
  const [teacherData, setTeacherData] = useState(teacherData1);

  // useEffect(() => {
  //   getTeacherProfile(1)
  //   .then((response) => setTeacherData(response.data))
  //   .catch((error) => console.error('Error fetching teacher data: ', error));
  // }, []);

  const [trigger, SetTrigger] = React.useState(false);
  return (
    <div >
      <section id="teacher">
        <AddItem trigger={trigger} SetTrigger={() => SetTrigger(!trigger)} info={{name: "Classroom"}}/>
        <div className="profile-container">
          <div className="profile-info">
            <img src={require(`../assets/images/${teacherData.displayPicture}`)} alt="Profile" />
            <div className="profile-info-right">
              <h1>{teacherData.name}</h1>
              <p>Instructor ID: {teacherData.id}</p>
              <div className="btn-container">
                <button className="blue-btn" onClick={() => SetTrigger(!trigger)}>+ Add Classroom</button>
              </div>
            </div>
          </div>

          <div className="table">
            <div className="search-container">
              <input type="text" id="search" placeholder="Search Documents"/>
            </div>
            <div className="table-header">
                <p>Classroom</p>
                <p>No. of Assignments</p>
                <p>No. of Students</p>
                <p>Detail</p>
            </div>
            <div className="table-content">
              {teacherData.classroomDetails.map((classroom, index) => (
                <div className="table-row" key={index}>
                  <div className="file-name">{classroom.name}</div>
                  <div>{classroom.assignmentNo}</div>
                  <div>{classroom.studentNo}</div>
                  <div className="row-detail">
                    {/* <img src={require(`../assets/images/icons/download_icon.png`)}></img> */}
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

export default TeacherProfile;
