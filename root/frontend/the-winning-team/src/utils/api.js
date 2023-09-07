import axios from "axios";

const API_BASE_URL = "";

export const getStudentProfile = (studentID) => {
  return axios.get(`${API_BASE_URL}/students/${studentID}`);
};

export const getTeacherProfile = (teacherID) => {
  return axios.get(`${API_BASE_URL}/teachers/${teacherID}`);
};

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};