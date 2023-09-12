import React from 'react';
import { getStudentProfile } from '../utils/api.js';
import '../css/Profile.css'

function StudentProfile() {
  const studentData1 = {
    name: 'Rohit Ambakkat',
    studentNumber: 129312,
    assignmentDetails: [{
      name: 'document_1.pdf',
      group: 'assignment_group_1',
      simScore: 92,
    }],
    displayPicture: 'john_smith.jpeg',
  };

  const [studentData, setStudentData] = React.useState(studentData1);

  // React.useEffect(() => {
  //   getStudentProfile(1)
  //   .then((response) => setStudentData(response.data))
  //   .catch((error) => console.error('Error fetching student data: ', error));
  // }, []);   

  return (
    <section id="profile">
      <div className="profile-info">
        <img src={require(`../assets/images/${studentData.displayPicture}`)} alt="Profile" />
        <div className="profile-info-right">
          <h1>{studentData.name}</h1>
          <div>Student Number: {studentData.studentNumber}</div>
          <div className="stats">
            <p>STATS: ####</p>
            <p>STATS: ####</p>
            <p>STATS: ####</p>
          </div>
          <button className="blue-btn">+ Add Document</button>
        </div>
      </div>
      <div className="table">
        <div className="table-header">
            <p>Assignment Name</p>
            <p>Type</p>
            <p>Score</p>
            <p>Detail</p>
        </div>
        <div className="table-content">
          {studentData.assignmentDetails.map((assignment, index) => (
            <div className="table-row" key={index}>
              <div>{assignment.name}</div>
              <div>{assignment.group}</div>
              <div>{assignment.simScore}%</div>
              <div><button>VIEW</button></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentProfile;
