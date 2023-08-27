import React from 'react';

function TeacherProfile() {
  const teacherData = {
    name: 'John Smith',
    teacherID: 901,
    groupDetails: {
      name: 'assignment_group_1',
      students: ['John Smith', 'Sarah Jane', 'Kevin Ngoh'],
      assignments: ['Sample Assignment 1', 'Sample Assignment 2'],
    },
    displayPicture: 'john_smith.jpeg',
  };

  return (
    <div>
      <h2>Teacher Profile</h2>
      <div>
        <strong>Name:</strong> {teacherData.name}
      </div>
      <div>
        <strong>Teacher Number:</strong> {teacherData.teacherNumber}
      </div>
      <div>
        <strong>Display Picture:</strong> <img src={teacherData.profileImage} alt="Profile" />
      </div>
      <div>
        <strong>Assignment Name:</strong> {teacherData.assignmentDetails.name}
      </div>
      <div>
        <strong>Assignment Group:</strong> {teacherData.assignmentDetails.group}
      </div>
      <div>
        <strong>Similarity Score:</strong> {teacherData.assignmentDetails.simScore}%
      </div>
    </div>
  );
}

export default TeacherProfile;
