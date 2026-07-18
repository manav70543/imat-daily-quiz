import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getRecentStudents,
} from "../services/adminService";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadDashboard();
    loadRecentStudents();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setDashboard(data.dashboard);
    } catch (err) {
      console.error(err);
    }
  };

  const loadRecentStudents = async () => {
    try {
      const data = await getRecentStudents();
      setStudents(data.students);
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
            <h2>{dashboard.totalSubjects}</h2>
            <span>Total Subjects</span>
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

          <div className="stat-card">
            <h2>{dashboard.todayAttempts}</h2>
            <span>Today's Attempts</span>
          </div>

          <div className="stat-card">
            <h2>{dashboard.averageScore}</h2>
            <span>Average Score</span>
          </div>

          <div className="stat-card">
            <h2>{dashboard.highestScore}</h2>
            <span>Highest Score</span>
          </div>

          <div className="stat-card">
            <h2>{dashboard.lowestScore}</h2>
            <span>Lowest Score</span>
          </div>
        </div>

        <div className="recent-students">
          <h2>Recent Students</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.full_name}</td>

                  <td>{student.email}</td>

                  <td>
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}