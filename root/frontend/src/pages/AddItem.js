import React, { useState } from "react";
import "../css/popups/AddItem.css";
// import { getTeacherPage } from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  createStudentProfile,
  createAssignmentProfile,
  createClassroomProfile,
  addStudentSubject,
  getAllStudentProfile
} from "../utils/api";
import BeatLoader from "react-spinners/BeatLoader";

function AddItem(props) {
  const [formData, setFormData] = useState({
    Name: "",
    Id: "",
    subject_id: props.subjectID
  });

  const [isLoading, setIsLoading] = React.useState(false);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

  React.useEffect(() => {
    async function waitForSubjectID() {
      while (!props.subjectID) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setFormData({ ...formData, Id: props.subjectID, subject_id: props.subjectID });
      console.log(props.subjectID, "subject ID is")
    }
    waitForSubjectID();
  }, [props.subjectID]);
  
	const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (props.info.name === "Students") {
        setIsLoading(true)
        try {
          const allStudents = await getAllStudentProfile();
          const exists = allStudents.some(item => item.Id == formData.Id);
          if (exists == false) {
            const newStudent = await createStudentProfile(formData);
          }
          const studentProfile = await addStudentSubject(formData);
          console.log("add success!");
          props.manageAlert("Profile Created", "success");
          const newData = await props.getFunction(props.inputData);
          props.setNewData(newData)
          setIsLoading(false)
        } 
        catch (error) {
          props.manageAlert("Add failed", "fail");
          setIsLoading(false)
        }
      }
      if (props.info.name === "Assignment") {
        setIsLoading(true)
        try {
          console.log(formData);
          const assignmentProfile = await createAssignmentProfile(formData);
          props.manageAlert("Assignment Created", "success");
          const newData = await props.getFunction(props.inputData);
          console.log(newData, "testing");
          props.setNewData(newData)
          setIsLoading(false)
        } 
        catch (error) {
          props.manageAlert("Assignment Creation failed", "fail");
          setIsLoading(false)
        }
      }
      if (props.info.name === "Classroom") {
        setIsLoading(true)
        try {
          const classroomProfile = await createClassroomProfile(formData, props.info.ID);
          props.manageAlert("Classroom Created", "success");
          //refresh once new data is added
          const newData = await props.getFunction(props.inputData);
          props.setNewData(newData)
          setIsLoading(false)
        } 
        catch (error) {
          props.manageAlert("Classroom Creation failed", "fail");
          setIsLoading(false)
        }
      }

			props.SetTrigger(false);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	if (props.trigger) {
		document.body.style.overflowY = "hidden";
	} else {
		document.body.style.overflowY = "auto";
	}

  return props.trigger ? (
    <div id="additem">
      <div className="additem-container">
        <button className="close-btn" onClick={props.SetTrigger}>
          <FontAwesomeIcon className="close-icon" icon={faXmark} />
        </button>
        <div className="additem-header">
          <h1>Add {props.info.name}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="additem-input">
            {props.hasID && <label htmlFor="Id">{props.info.name === "Assignment" ? "Subject " : props.info.name}
            ID:</label>}
            {props.hasID && (
              <input
                type="number"
                id="Id"
                name="Id"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
            )}

						<label htmlFor="Name">{props.info.name} Name:</label>
						<input type="text" id="Name" name="Name" value={formData.name} onChange={handleInputChange} required />
          </div>
          {isLoading ? (
              <BeatLoader className="loading-icon" color="#7179e7" />
            ) : (
              <button type="submit" className="blue-btn">
                Add {props.info.name}
              </button>
            )}
        </form>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddItem;
