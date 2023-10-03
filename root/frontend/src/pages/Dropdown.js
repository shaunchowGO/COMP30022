import React from 'react';
import '../css/Dropdown.css'; 

function Dropdown(props) {
    const [selectedStudent, setSelectedStudent] = React.useState("");
    const [toggleDrop, setToggleDrop] = React.useState(false);

    const displayStudent = () => {
        if (selectedStudent === "") {
          return "-Select-";
        }
        else {
          return selectedStudent;
        }
      }
    
    return (
        <div className="drop-down">
            <p>Select Student to Compare</p>
            <div className="select-option">
            <div className="selected" onClick={() => setToggleDrop(!toggleDrop)}>{displayStudent()}</div>
            {
                toggleDrop &&
                <ul className="options">
                    {props.data.map((student) => (
                        <li className="file-name" onClick={() => {setSelectedStudent(student.name); setToggleDrop(!toggleDrop)}}>{student.name}</li>
                    ))}
                </ul>
            }
            </div>
        </div>
    )
    
}

export default Dropdown;