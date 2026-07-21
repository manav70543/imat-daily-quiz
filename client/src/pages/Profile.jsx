import { useEffect, useState } from "react";

import {
  getStudentProfile,
  getStudentXP,
  getCurrentStreak,
  getStudentDashboard
} from "../services/quizService";

import { changePassword } from "../services/authService";

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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleChangePassword = async () => {

    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);

      const data = await changePassword(
        oldPassword,
        newPassword,
        confirmPassword
      );

      alert(data.message);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to change password."
      );

    } finally {

      setLoading(false);

    }

  };

  if (!profile || !xpData || !dashboard) {
    return (
      <h2 className="loading">
        Loading Profile...
      </h2>
    );
  }

  return (
    <>
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

            <h1>
              {streak} Day{streak !== 1 ? "s" : ""}
            </h1>

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

        <div
          className="profile-card"
          style={{ marginTop: "30px" }}
        >

          <h2
            style={{
              marginBottom: "20px",
              textAlign: "center"
            }}
          >
            🔒 Change Password
          </h2>

          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box"
            }}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              boxSizing: "border-box"
            }}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              boxSizing: "border-box"
            }}
          />

          <button
            onClick={handleChangePassword}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              opacity: loading ? 0.7 : 1,
              fontWeight: "600"
            }}
          >
            {loading
              ? "Updating Password..."
              : "Change Password"}
          </button>

        </div>

      </div>

    </>
  );
}