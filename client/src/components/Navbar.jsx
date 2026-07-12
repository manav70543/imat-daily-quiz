import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#2563eb",
        color: "white",
      }}
    >
      <h2>IMAT Quiz</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/dashboard" style={{ color: "white" }}>
          Dashboard
        </Link>

        <Link to="/quiz" style={{ color: "white" }}>
          Quiz
        </Link>

        <Link to="/leaderboard" style={{ color: "white" }}>
          Leaderboard
        </Link>

        <Link to="/history" style={{ color: "white" }}>
          History
        </Link>

        <Link to="/profile" style={{ color: "white" }}>
          Profile
        </Link>
      </div>
    </nav>
  );
}