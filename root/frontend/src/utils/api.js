import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

//Get Student Profile info from DB
export const getStudentProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student`, {
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
export const getTeacherProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teacher`, {
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
