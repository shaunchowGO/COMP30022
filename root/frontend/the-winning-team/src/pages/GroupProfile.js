import React from 'react';

function GroupProfile() {
  const groupData = {
    name: 'assignment_group_1',
    assignments: [
      {
        name: 'Sample Assignment 1',
        status: 80,
        dueDate: '11-08',
      },
      {
        name: 'Sample Assignment 2',
        status: 40,
        dueDate: '21-08',
      },
    ],
  };

  return (
    <div>
      <h2>Group Profile</h2>
      <div>
        <strong>Group Name:</strong> {groupData.name}
      </div>
      <h3>Assignments</h3>
      <table>
        <thead>
          <tr>
            <th>Assignment Name</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {groupData.assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.name}</td>
              <td>{assignment.status}</td>
              <td>{assignment.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroupProfile;
