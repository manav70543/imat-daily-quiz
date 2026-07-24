import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  getStudentDashboard
} from "../services/quizService";
import {
  FaBookOpen,
  FaChartLine,
  FaTrophy,
  FaCheckCircle,
  FaPlay,
  FaHistory,
  FaMedal,
  FaFire
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from "recharts";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [xpData, setXpData] = useState(null);

useEffect(() => {
  loadDashboard();
}, []);

const loadDashboard = async () => {
  try {
    const data = await getStudentDashboard();

    setDashboard(data.dashboard);
    setWeeklyData(data.weekly || []);
    setSubjects(data.subjects || []);
    setStreak(data.streak || 0);
    setAchievements(data.achievements || []);
    setXpData(data.xp || null);

  } catch (error) {
    console.error("Dashboard loading error:", error);
  }
};
  if (!dashboard) {
    return (
      <div className="dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }
  console.log("xpData =", xpData);
  return (
    <>

      <div className="dashboard">

        <div className="dashboard-header">
          <h1>Welcome Back 👋</h1>
          <p>Track your IMAT preparation every day.</p>
        </div>

        <div className="dashboard-grid">

          <div className="stat-card">
            <FaBookOpen className="stat-icon blue" />
            <h2>{dashboard.quizzesAttempted}</h2>
            <span>Quizzes Attempted</span>
          </div>

          <div className="stat-card">
            <FaChartLine className="stat-icon green" />
            <h2>{dashboard.averageScore}%</h2>
            <span>Average Score</span>
          </div>

          <div className="stat-card">
            <FaTrophy className="stat-icon orange" />
            <h2>{dashboard.bestScore}</h2>
            <span>Best Score</span>
          </div>

          <div className="stat-card">
            <FaCheckCircle className="stat-icon purple" />
            <h2>
              {dashboard.todayCompleted ? "Completed" : "Pending"}
            </h2>
            <span>Today's Quiz</span>
          </div>

        </div>
        <div className="goal-card">

          <h2>🎯 Daily Goal</h2>

          <div className="goal-progress">

            <div
              className="goal-fill"
              style={{
                width: `${dashboard.todayCompleted ? 100 : 0}%`
              }}
            ></div>

          </div>

          <p>
            {dashboard.todayCompleted
              ? "50 / 50 Questions Completed"
              : "0 / 50 Questions Completed"}
          </p>

        </div>
        <div className="streak-card">

          <h2>🔥 Current Streak</h2>

          <h1>{streak} Day{streak !== 1 ? "s" : ""}</h1>

          <p>
            {streak === 0
              ? "Start today's quiz to begin your streak!"
              : "Keep the momentum going!"}
          </p>

        </div>
        <div className="xp-card">
          <h2>⭐ Level {xpData?.level}</h2>

          <h1>{xpData?.xp} XP</h1>

          <div className="goal-progress">
            <div
              className="goal-fill"
              style={{
                width: `${xpData?.progress}%`
              }}
            />
          </div>

          <p>
            {xpData?.xp} / {xpData?.nextLevelXP} XP
          </p>

          <small>
            {xpData?.nextLevelXP - xpData?.xp} XP until Level {xpData?.level + 1}
          </small>
        </div>
        <div className="performance-summary">

          <div className="summary-card">

            <h3>🏆 Strongest Subject</h3>

            <h2>{subjects[0]?.subject || "-"}</h2>

            <span>{subjects[0]?.score || 0}%</span>

          </div>

          <div className="summary-card">

            <h3>📉 Needs Improvement</h3>

            <h2>{subjects[subjects.length - 1]?.subject || "-"}</h2>

            <span>{subjects[subjects.length - 1]?.score || 0}%</span>

          </div>

        </div>
        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="action-buttons">

            <Link to="/quiz" className="action-btn">
              <FaPlay />
              Start Quiz
            </Link>

            <Link to="/leaderboard" className="action-btn">
              <FaMedal />
              Leaderboard
            </Link>

            <Link to="/history" className="action-btn">
              <FaHistory />
              History
            </Link>

          </div>

        </div>

        <div className="motivation-card">

          <FaFire className="fire-icon" />

          <h2>Keep Going!</h2>

          <p>
            Every quiz you complete brings you one step closer to your dream medical university.
          </p>

        </div>
        <div className="chart-card">

          <h2>Weekly Performance</h2>

          <ResponsiveContainer width="100%" height={320}>

            <LineChart data={weeklyData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#2f65e9"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>
        <div className="chart-card">

          <h2>Subject Performance</h2>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={subjects}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="subject" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Bar
                dataKey="score"
                fill="#2f65e9"
                radius={[8, 8, 0, 0]}
                barSize={55}
              >
                <LabelList
                  dataKey="score"
                  position="top"
                />
              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>
        <div className="chart-card">

          <h2>🏅 Achievements</h2>

          <div className="achievement-grid">

            {achievements.map((item, index) => (

              <div
                key={index}
                className={
                  item.unlocked
                    ? "achievement unlocked"
                    : "achievement locked"
                }
              >

                <h1>{item.icon}</h1>

                <h3>{item.title}</h3>

                <p>

                  {item.unlocked
                    ? "Unlocked"
                    : "Locked"}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
    </>
  );
}