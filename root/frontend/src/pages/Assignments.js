import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Import from "./Import.js";
import Footer from "./Footer.js";
import Filter from "./Filter.js";
import "../css/pages/Assignment.css";

function GroupProfile() {
	const groupData = {
		filename: "COMP30022_Assignment_1",
		subjectName: "IT Project",
		assignments: [
			{
				name: "Rohit Ambakkat",
				filename: "COMP3022_Assignment1_129312",
				score: 92,
				date: "Sep 9, 2023",
			},
		],
	};

	const studentData = {
		details: [
			{
				id: 1234566,
				name: "John Doe",
			},
			{
				id: 1122388,
				name: "Jane Doe",
			},
			{
				id: 1167144,
				name: "Thaya Chevaphatrakul",
			},
			{
				id: 1152451,
				name: "Rohit Sandeep",
			},
		],
	};

	const [importTrigger, SetImportTrigger] = React.useState(false);

	return (
		<div>
			<section id="assignment">
				<Import
					trigger={importTrigger}
					SetImportTrigger={() => SetImportTrigger(!importTrigger)}
					isCompare={true}
					studentData={studentData}
				/>
				<div className="profile-container">
					<div className="profile-info">
						<div className="profile-info-right">
							<h1>{groupData.filename}</h1>
							<p>Assignment for: {groupData.subjectName}</p>
							<button className="blue-btn" onClick={() => SetImportTrigger(!importTrigger)}>
								+ Add Submission
							</button>
						</div>
					</div>

					<div className="table">
						<div className="table-header">
							<p>Student Name</p>
							<p>Similarity Score</p>
							<p>Date Added</p>
							<p>Details</p>
						</div>
						<div className="table-content">
							{groupData.assignments.map((assignment, index) => (
								<div className="table-row" key={index}>
									<div className="file-name">{assignment.name}</div>
									<div>{assignment.score}%</div>
									<div>{assignment.date}</div>
									<div className="row-detail">
										<Link to="/student">
											<FontAwesomeIcon className="icon" icon={faEye} />
										</Link>
										<FontAwesomeIcon className="icon" icon={faTrash} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* <Filter buttonLabels={["Student Name", "Similarity Score", "Date Added"]} hasScore={true}/> */}
			</section>
			<Footer />
		</div>
	);
}

export default GroupProfile;
