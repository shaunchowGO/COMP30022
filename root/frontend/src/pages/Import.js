import React from "react";
import { uploadFile } from "../utils/api";
import "../css/popups/Import.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown.js";

function Import(props) {
	const [files, setFiles] = React.useState(null);
	const inputRef = React.useRef();
	const [studentID, setStudentID] = React.useState(null)

	const handleDrag = event => {
		event.preventDefault();
	};

	const handleDrop = event => {
		event.preventDefault();
		setFiles(event.dataTransfer.files);
		console.log(files);
	};


  const handleFileType = (event) => {
    const allowedTypes = ["text/plain"];
    const validFiles = Array.from(event.target.files).filter((file) => {
      return allowedTypes.includes(file.type);
    });

    if (validFiles.length === 0) {
      alert("Please select one or more text files.");
    } else {
      setFiles(validFiles);
    }
  };

	/* eslint-disable no-restricted-globals */

	const handleImport = async event => {
		event.preventDefault();

		if (files) {
			try {
				const studentInfo = {
					assignmentID: props.assignmentID,
					subject_name: props.subjectName,
					studentID: studentID.id
				};

				const response = await uploadFile(files[0], studentInfo);

				console.log("Upload success:", response);

				setFiles(null);
			} catch (error) {
				console.error("Upload failed:", error);
			}
		}
	};

	if (props.trigger) {
		document.body.style.overflowY = "hidden";
	} else {
		document.body.style.overflowY = "auto";
	}


	return props.trigger ? (
		<div id="import">
			<div className="import-container">
				<div className="import-header">
					<div className="import-title">
						<h1>Import Document</h1>
						<button className="close-btn" onClick={props.SetImportTrigger}>
							<FontAwesomeIcon className="close-icon" icon={faXmark} />
						</button>
					</div>
					<p>Select a students assignment to be added to their profile</p>
				</div>

				{!files ? (
					<div className="import-box" onDragOver={handleDrag} onDrop={handleDrop}>
						<p>Drop an assignment file</p>
						<input type="file" multiple onChange={event => handleFileType(event)} hidden ref={inputRef}></input>
						<button className="blue-btn" onClick={() => inputRef.current.click()}>
							<img src={require("../assets/images/icons/upload_icon.png")}></img>
							Upload
						</button>
					</div>
				) : (
					<div className="uploads">
						<ul>
							{Array.from(files).map((file, idx) => (
								<li key={idx}>{file.name}</li>
							))}
						</ul>
					</div>
				)}

				{props.isCompare && <Dropdown data={props.data} setStudentID={setStudentID}/>}

				<div className="import-btn">
					<button
						className="discard-btn blue-btn"
						onClick={() => {
							setFiles(null);
						}}
					>
						Discard
					</button>
					<button className="blue-btn" onClick={() => handleImport(event)}>
						Import
					</button>
				</div>
			</div>
		</div>
	) : (
		""
	);
}

export default Import;
