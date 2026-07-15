import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminService";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setDashboard(data.dashboard);
    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboard) {
    return (
      <>
        <AdminSidebar />
        <div
          style={{
            marginLeft: "280px",
            padding: "40px",
          }}
        >
          <h2>Loading...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminSidebar />

      <div
        className="dashboard"
        style={{
          marginLeft: "280px",
          maxWidth: "calc(100% - 320px)",
        }}
      >
        <h1>Admin Dashboard</h1>

        <div className="dashboard-grid">
          <div className="stat-card">
            <h2>{dashboard.totalStudents}</h2>
            <span>Total Students</span>
          </div>

          <div className="stat-card">
            <h2>{dashboard.totalQuestions}</h2>
            <span>Total Questions</span>
          </div>

          <div className="stat-card">
            <h2>{dashboard.totalQuizzes}</h2>
            <span>Total Quizzes</span>
          </div>

          <div className="stat-card">
            <h2>{dashboard.totalAttempts}</h2>
            <span>Total Attempts</span>
          </div>
        </div>
      </div>
    </>
  );
}