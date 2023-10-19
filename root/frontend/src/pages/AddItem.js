import React, { useState } from "react";
import "../css/popups/AddItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  createStudentProfile,
  createAssignmentProfile,
  createClassroomProfile,
} from "../utils/api";
import BeatLoader from "react-spinners/BeatLoader";

function AddItem(props) {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    dueDate: null,
    startDate: null,
  });
  const [isLoading, setIsLoading] = React.useState(false);

	const handleInputChange = event => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();
		console.log(formData);

    try {
      if (props.info.name === "Students") {
        setIsLoading(true)
        try {
          const studentProfile = await createStudentProfile(formData);
          console.log("Student profile created:", studentProfile);
          props.manageAlert("Profile Created", "success");
          setIsLoading(false)
          window.location.reload();
        } catch (error) {
          console.log("Error adding classroom")
          props.manageAlert("Profile Creation failed", "failed");
          setIsLoading(false)
        }
      }
      if (props.info.name === "Assignment") {
        setIsLoading(true)
        try {
          const assignmentProfile = await createAssignmentProfile(formData);
          console.log("Assignment profile created:", assignmentProfile);
          props.manageAlert("Assignment Created", "success");
          setIsLoading(false)
          window.location.reload();
        } catch (error) {
          console.log("Error adding classroom")
          props.manageAlert("Assignment Creation failed", "failed");
          setIsLoading(false)
        }
      }
      if (props.info.name === "Classroom") {
        setIsLoading(true)
        try {
          const classroomProfile = await createClassroomProfile(formData, props.info.ID);
          console.log("Classroom profile created:", classroomProfile);
          props.manageAlert("Classroom Created", "success");
          setIsLoading(false)
          window.location.reload();
        } catch (error) {
          console.log("Error adding classroom")
          props.manageAlert("Classroom Creation failed", "failed");
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
            {props.hasID && <label htmlFor="id">{props.info.name} ID:</label>}
            {props.hasID && (
              <input
                type="number"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
            )}

						<label htmlFor="name">{props.info.name} Name:</label>
						<input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />

						{/* Render Due date & End end date fields if in props */}
						{/* {props.hasDate && (
                        <div>
                            <label htmlFor="dueDate">Due Date:</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        )}
                        {props.hasDate && (
                            <div>
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )} */}
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
