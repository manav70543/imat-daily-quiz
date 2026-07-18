import API from "../api/axios";

// Register
export const registerStudent = async (full_name, email, password) => {
  const { data } = await API.post("/student/register", {
    full_name,
    email,
    password,
  });

  return data;
};

// Login
export const loginStudent = async (email, password) => {
  const { data } = await API.post("/student/login", {
    email,
    password,
  });

  return data;
};

// Profile
export const getProfile = async () => {
  const { data } = await API.get("/quiz/student/profile");
  return data;
};