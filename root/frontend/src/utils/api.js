import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "http://20.55.71.66:5000";


// =============================================================	Students    ============================================================= //

//Create Student Profile instance in DB
export const createStudentProfile = async studentData => {
	try {
		console.log(studentData)
		const response = await axios.post(`${API_BASE_URL}/student`, studentData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error creating student profile: ", error);	
		throw error;
	}
};

// Routes to delete entries in the SQL DB
export const deleteStudentProfile = async studentId => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/student/${studentId}`);

		return response.data;
	} catch (error) {
		console.log(`Error deleting student profile with ID ${studentId}: `, error);
		throw error;
	}
};

//Get ALL Student Profile info from DB
export const getAllStudentProfile = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/student_all`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching student profile data: ", error);
		throw error;
	}
};

//Get Student Profile info from DB based on their ID
export const getStudentProfile = async studentID => {
	try {
		const response = await axios.get(`${API_BASE_URL}/student`, {
			params: { studentID },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching student profile data: ", error);
		throw error;
	}
};

// Get student profile assignment info from DB
export const getStudentAssignmentInfo = async studentID => {
	try {
		const response = await axios.get(`${API_BASE_URL}/assignment-info`, {
			params: { studentID },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching Student's assignment info: ", error);
		throw error;
	}
};

// Get profile of students that are enrolled in the subject
export const getStudentsInSubject = async subjectID => {
	try {
		const response = await axios.get(`${API_BASE_URL}/students`, {
			params: { subjectID },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching student profile data: ", error);
		throw error;
	}
};

//Get Student Profile info from DB based on their ID
export const getStudentFiles = async studentID => {
	try {
		const response = await axios.get(`${API_BASE_URL}/student`, {
			params: { studentID },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching student profile data: ", error);
		throw error;
	}
};



// =============================================================	Teachers    ============================================================= //
// Teacher and Academics are the same thing

// Create Teacher's Profile instance in DB
export const createAcademicProfile = async academicData => {
	try {
		const response = await axios.post(`${API_BASE_URL}/new_academic`, academicData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error creating student profile: ", error);
		throw error;
	}
};

// Get ALL Teacher profiles info from DB
export const getAllTeacherProfile = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/teacher1`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching teacher profile data: ", error);
		throw error;
	}
};


//Get Teacher page info from DB
export const getTeacherPage = async teacherID => {
	try {
		const response = await axios.get(`${API_BASE_URL}/teacher-info`, {
			params: { teacherID },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching teacher profile data: ", error);
		throw error;
	}
};


// Get Teacher profile info from DB based on their ID
export const getTeacherProfile = async teacherID => {
	try {
		const response = await axios.get(`${API_BASE_URL}/teacher`, {
			params: { teacherID },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching teacher profile data: ", error);
		throw error;
	}
};

// =============================================================	Logins    ============================================================= //


// Compare the login information to see if they match
export const compareLoginData = async username => {
	try {
		const response = await axios.get(`${API_BASE_URL}/comp_login`, {
			params: { username },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching login  profile data: ", error);
		throw error;
	}
};


// Create a new login instance (account) in the DB
export const createNewAccount = async accountData => {
	try {
		const response = await axios.post(`${API_BASE_URL}/signup`, accountData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error creating student profile: ", error);
		throw error;
	}
};

// Get the login information from DB
export const getLoginData = async (username, password) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/login`, {
			params: { username, password },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching login  profile data: ", error);
		throw error;
	}
};

// =============================================================	Assignments    ============================================================= //

// Creates an Assignment Profile instance in the DB
export const createAssignmentProfile = async assignmentData => {
	try {
		const response = await axios.post(`${API_BASE_URL}/assignment`, assignmentData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error creating assignment profile: ", error);
		throw error;
	}
};

// Delete the assignment profile
export const deleteAssignmentProfile = async assignmentId => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/assignment/${assignmentId}`);

		return response.data;
	} catch (error) {
		console.log(`Error deleting assignment profile with ID ${assignmentId}: `, error);
		throw error;
	}
};

// Download the assignment submission
export const downloadSubmission = async (subjectName, studentID, assignmentID) => {
	const downloadUrl = `${API_BASE_URL}/download?subjectName=${subjectName}&studentID=${studentID}&assignmentID=${assignmentID}`;
	
	try {
	  const response = await axios.get(downloadUrl, {
		responseType: 'blob', 
	  });
  
	  if (response.status === 200) {
		return {
		  downloadUrl,
		  blob: new Blob([response.data]),
		};
	  } else {
		throw new Error('Download request failed');
	  }
	} catch (error) {
	  throw error;
	}
};

// Get Assignment Info from DB based on subject ID
export const getAssignmentInfo = async (subjectID) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/assignment`, {
      params: {subjectID},
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching assignment info: ", error);
		throw error;
	}
};

// route to connect to the File Storage
export const uploadFile = async (file, studentInfo) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("assignmentID", studentInfo.assignmentID);
	formData.append("subject_name", studentInfo.subject_name);
	formData.append("studentID", studentInfo.studentID);

	try {
		const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};


// =============================================================	Subjects    ============================================================= //
// Classroom and Subjects are the same thing

// Add student into the subject
export const addStudentSubject = async studentData => {
	try {
		const response = await axios.post(`${API_BASE_URL}/subject_student`, studentData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error creating student profile: ", error);
		throw error;
	}
};

// Creates a Classroom instance in DB
export const createClassroomProfile = async (classroomData, academicID) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/classroom`, classroomData, {
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				academicID: academicID,
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error creating classroom profile: ", error);
		throw error;
	}
};

// Delete the classroom from DB
export const deleteClassroomProfile = async classroomId => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/classroom/${classroomId}`);

		return response.data;
	} catch (error) {
		console.log(`Error deleting classroom profile with ID ${classroomId}: `, error);
		throw error;
	}
};

// Get Subject Info from DB basead on Subject ID
export const getSubjectInfo = async (subjectID) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subject`, {
      params: {subjectID},
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching Subject info: ", error);
    throw error;
  }
};


// Get Submisison Info from DB
export const getSubmissionInfo = async (assignmentID) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/submissions`, {
      params: {assignmentID},
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching submission info: ", error);
    throw error;
  }
};

// Get subject profile info from DB
export const getSubjectPage = async subjectID => {
	try {
		const response = await axios.get(`${API_BASE_URL}/subject-info`, {
			params: { subjectID },
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching Subject page data: ", error);
		throw error;
	}
};

// Get student profiles that are enrolled in the subject
export const getSubjectStudents = async subjectID => { 
    try {
        const response = await axios.get(`${API_BASE_URL}/subject_student`, {
            params: { subjectID },
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.log("Error fetching student profile data: ", error);
        throw error;
    }
};

