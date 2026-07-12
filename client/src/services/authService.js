import API from "../api/axios";

export const loginStudent = async (email, password) => {
  const response = await API.post("/student/login", {
    email,
    password,
  });

  return response.data;
};