import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "../services/authService";
import "../styles/login.css";

export default function Login() {

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem("token")) {
            navigate("/dashboard", { replace: true });
        }

    }, [navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        if (!email || !password) {

            alert("Please enter email and password.");
            return;

        }

        try {

            setLoading(true);

            const data = await loginStudent(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("student", JSON.stringify(data.student));
            localStorage.setItem("student_id", data.student.id);

            navigate("/dashboard", { replace: true });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>IMAT Daily Quiz</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="login-btn"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="login-link">
                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>
                </p>

                <p className="login-register">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}