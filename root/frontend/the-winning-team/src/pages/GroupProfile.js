import React from 'react';
import '../css/Group.css'

function GroupProfile() {
  const groupData = {
    name: 'COMP30022',
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
      {
        name: 'Sample Assignment 2',
        status: 40,
        dueDate: '21-08',
      },
      {
        name: 'Sample Assignment 2',
        status: 40,
        dueDate: '21-08',
      },
      {
        name: 'Sample Assignment 2',
        status: 40,
        dueDate: '21-08',
      },
      {
        name: 'Sample Assignment 2',
        status: 40,
        dueDate: '21-08',
      },
    ],
  };

  return (
    <section id="group">
      <div className="group-util">
        <div className="group-name">
          <h1>
            {groupData.name}
          </h1>
          <p>STATS: ####</p>
          <p>STATS: ####</p>
          <p>STATS: ####</p>
        </div>
        <div className="group-widget"></div>
      </div>
      <div className="group-btn">
        <h3>ASSIGNMENTS</h3>
        <button className="blue-btn">+ Add Document</button>
      </div>
      <div className="table">
        <div className="table-header">
            <p>Assignment Name</p>
            <p>Status</p>
            <p>Due Date</p>
            <p>Detail</p>
        </div>
        <div className="table-content">
          {groupData.assignments.map((assignment, index) => (
            <div className="table-row" key={index}>
              <div>{assignment.name}</div>
              <div>{assignment.status}%</div>
              <div>{assignment.dueDate}</div>
              <div><button>VIEW</button></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GroupProfile;
