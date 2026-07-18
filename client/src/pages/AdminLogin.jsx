import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/admin/login", {
        email,
        password,
      });

      console.log(data);

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));

      alert("Login Successful");

      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      alert(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={loginAdmin} className="admin-login-card">
        <h1>Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}