import API from "../api/axios";

// ===========================
// Register
// ===========================
export const registerStudent = async (
  full_name,
  email,
  password
) => {
  const { data } = await API.post("/students/register", {
    full_name,
    email,
    password,
  });

  return data;
};

// ===========================
// Login
// ===========================
export const loginStudent = async (email, password) => {
  const { data } = await API.post("/students/login", {
    email,
    password,
  });

  return data;
};

// ===========================
// Profile
// ===========================
export const getProfile = async () => {
  const { data } = await API.get("/students/profile");
  return data;
};