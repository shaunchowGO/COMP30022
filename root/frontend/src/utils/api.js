import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

//Get Student Profile info from DB
export const getStudentProfile = async (studentID) => {
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

//Get Teacher profile info from DB
export const getTeacherProfile = async (teacherID) => {
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

//Get Teacher profile info from DB
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

// Get Assignment Info from DB
export const getAssignmentInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assignment`, {
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

//Create Student Profile instance in DB
export const createStudentProfile = async (studentData) => {
  try {
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

// Creates an Assignment Profile instance in the DB
export const createAssignmentProfile = async (assignmentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/assignment`,
      assignmentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error creating assignment profile: ", error);
    throw error;
  }
};

// Creates a Classroom instance in DB
export const createClassroomProfile = async (classroomData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/classroom`,
      classroomData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error creating classroom profile: ", error);
    throw error;
  }
};

//Routes to delete entries in the SQL DB
export const deleteStudentProfile = async (studentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/student/${studentId}`);

    return response.data;
  } catch (error) {
    console.log(`Error deleting student profile with ID ${studentId}: `, error);
    throw error;
  }
};

export const deleteAssignmentProfile = async (assignmentId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/assignment/${assignmentId}`
    );

    return response.data;
  } catch (error) {
    console.log(
      `Error deleting assignment profile with ID ${assignmentId}: `,
      error
    );
    throw error;
  }
};

export const deleteClassroomProfile = async (classroomId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/classroom/${classroomId}`
    );

    return response.data;
  } catch (error) {
    console.log(
      `Error deleting classroom profile with ID ${classroomId}: `,
      error
    );
    throw error;
  }
};

// route to connect to the File Storage
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

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

//Get Teacher profile info from DB
export const getTeacherPage = async (teacherID) => {
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

//Get subject profile info from DB
export const getSubjectPage = async (subjectID) => {
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

//Get student profile assignment info from DB
export const getStudentAssignmentInfo = async (studentID) => {
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
