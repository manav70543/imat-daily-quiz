import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerStudent } from "../services/authService";
import "../styles/auth.css";

export default function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        const cleanName = fullName.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanName || !cleanEmail || !password) {
            alert("Please fill all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            const data = await registerStudent(
                cleanName,
                cleanEmail,
                password
            );

            alert(data?.message || "Registration successful.");

            navigate("/");

        } catch (error) {
            console.error("Registration error:", error);

            const message =
                error.response?.data?.message ||
                error.data?.message ||
                error.message ||
                "Registration failed. Please try again.";

            alert(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h1>Create Account</h1>

                <p className="login-subtitle">
                    Join IMAT Daily Quiz and start practicing.
                </p>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    autoComplete="name"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="new-password"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) {
                            handleRegister();
                        }
                    }}
                />

                <button
                    className="login-btn"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="login-register">
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}