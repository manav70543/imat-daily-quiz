import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBook,
  FaClipboardList,
  FaFolderOpen,
  FaSignOutAlt,
} from "react-icons/fa";

import "./AdminSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">
      <h2>IMAT Admin</h2>

      <NavLink to="/admin/dashboard">
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink to="/admin/students">
        <FaUsers />
        Students
      </NavLink>

      <NavLink to="/admin/questions">
        <FaBook />
        Questions
      </NavLink>

      <NavLink to="/admin/subjects">
        <FaFolderOpen />
        Subjects
      </NavLink>

      <NavLink to="/admin/quizzes">
        <FaClipboardList />
        Quizzes
      </NavLink>

      <button onClick={logout}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
}