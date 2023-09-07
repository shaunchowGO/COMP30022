import React from 'react';

function StudentProfile() {
  const studentData = {
    name: 'John Smith',
    studentNumber: 129312,
    assignmentDetails: {
      name: 'document_1.pdf',
      group: 'assignment_group_1',
      simScore: 92,
    },
    displayPicture: 'john_smith.jpeg',
  };


  // const [studentData, setStudentData] = React.useState(null);

  // React.useEffect(() => {
  //   getStudentProfile(1)
  //   .then((response) => setStudentData(response.data))
  //   .catch((error) => console.error('Error fetching student data: ', error));
  // }, []);

  return (
    <div>
      <h2>Student Profile</h2>
      <div>
        <strong>Name:</strong> {studentData.name}
      </div>
      <div>
        <strong>Student Number:</strong> {studentData.studentNumber}
      </div>
      <div>
        <strong>Display Picture:</strong> <img src={studentData.profileImage} alt="Profile" />
      </div>
      <div>
        <strong>Assignment Name:</strong> {studentData.assignmentDetails.name}
      </div>
      <div>
        <strong>Assignment Group:</strong> {studentData.assignmentDetails.group}
      </div>
      <div>
        <strong>Similarity Score:</strong> {studentData.assignmentDetails.simScore}%
      </div>
    </div>
  );
}

export default StudentProfile;
