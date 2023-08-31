import axios from "axios";

const API_BASE_URL = "";

export const getStudentProfile = (studentID) => {
  return axios.get(`${API_BASE_URL}/students/${studentID}`);
};

export const getTeacherProfile = (teacherID) => {
  return axios.get(`${API_BASE_URL}/teachers/${teacherID}`);
};
