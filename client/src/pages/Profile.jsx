import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  getStudentProfile,
  getStudentXP,
  getCurrentStreak,
  getStudentDashboard
} from "../services/quizService";

import {
  FaUserCircle,
  FaFire,
  FaStar,
  FaBookOpen,
  FaChartLine,
  FaTrophy
} from "react-icons/fa";

import "../styles/profile.css";

export default function Profile() {

  const [profile, setProfile] = useState(null);
  const [xpData, setXpData] = useState(null);
  const [streak, setStreak] = useState(0);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadProfile();
    loadXP();
    loadStreak();
    loadDashboard();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getStudentProfile();
      setProfile(data.profile);
    } catch (err) {
      console.error(err);
    }
  };

  const loadXP = async () => {
    try {
      const data = await getStudentXP();
      setXpData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStreak = async () => {
    try {
      const data = await getCurrentStreak();
      setStreak(data.streak);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDashboard = async () => {
    try {
      const data = await getStudentDashboard();
      setDashboard(data.dashboard);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile || !xpData || !dashboard) {
    return (
      <>
        <Navbar />
        <h2 className="loading">Loading Profile...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="profile">

        <div className="profile-card">

          <div className="avatar">
            <FaUserCircle />
          </div>

          <h1>{profile.full_name}</h1>

          <p>{profile.email}</p>

          <span>
            Joined on{" "}
            {new Date(profile.created_at).toLocaleDateString()}
          </span>

        </div>

        <div className="profile-grid">

          <div className="info-card">

            <FaStar className="icon gold" />

            <h2>Level {xpData.level}</h2>

            <h1>{xpData.xp} XP</h1>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${xpData.progress}%`
                }}
              ></div>

            </div>

            <p>
              {xpData.progress} / 100 XP
            </p>

          </div>

          <div className="info-card">

            <FaFire className="icon orange" />

            <h2>Current Streak</h2>

            <h1>{streak} Day{streak !== 1 ? "s" : ""}</h1>

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-box">

            <FaBookOpen className="stat-icon blue" />

            <h2>{dashboard.quizzesAttempted}</h2>

            <span>Quizzes</span>

          </div>

          <div className="stat-box">

            <FaChartLine className="stat-icon green" />

            <h2>{dashboard.averageScore}%</h2>

            <span>Average</span>

          </div>

          <div className="stat-box">

            <FaTrophy className="stat-icon yellow" />

            <h2>{dashboard.bestScore}</h2>

            <span>Best Score</span>

          </div>

        </div>

      </div>

    </>
  );
}