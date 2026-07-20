import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import "./Navbar.css";

export default function Navbar() {

  const { theme, changeTheme } = useTheme();

  return (

    <nav className="navbar">

      <h2 className="logo">
        🎓 IMAT Quiz
      </h2>

      <div className="nav-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/quiz">
          Quiz
        </Link>

        <Link to="/leaderboard">
          Leaderboard
        </Link>

        <Link to="/history">
          History
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <select
          className="theme-select"
          value={theme}
          onChange={(e)=>changeTheme(e.target.value)}
        >

          <option value="default">
            🤍 Default
          </option>

          <option value="dark">
            🌙 Dark
          </option>

          <option value="nahls-special">
            💖 Nahl's Special
          </option>

        </select>

      </div>

    </nav>

  );

}