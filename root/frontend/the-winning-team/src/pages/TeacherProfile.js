import React, { useEffect, useState } from 'react';

function TeacherProfile() {
  const teacherData1 = {
    name: 'Eduardo Riveria',
    teacherID: 901,
    groupDetails: {
      name: 'assignment_group_1',
      students: ['John Smith', 'Sarah Jane', 'Kevin Ngoh'],
      assignments: ['Sample Assignment 1', 'Sample Assignment 2'],
    },
  };

  const [teacherData, setTeacherData] = useState(null);

  useEffect(() => {
    getTeacherProfile(1)
    .then((response) => setTeacherData(response.data))
    .catch((error) => console.error('Error fetching teacher data: ', error));
  }, []);

  return (
    <div>
      <h2>Teacher Profile</h2>
      <div>
        <strong>Name:</strong> {teacherData.name}
      </div>
      <div>
        <strong>Teacher ID:</strong> {teacherData.teacherID}
      </div>
      <div>
        <h3>Group Details</h3>
        <div>
          <strong>Name:</strong> {teacherData.groupDetails.name}
        </div>
        <div>
          <strong>Students:</strong> {teacherData.groupDetails.students.join(', ')}
        </div>
        <div>
          <strong>Assignments:</strong> {teacherData.groupDetails.assignments.join(', ')}
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
