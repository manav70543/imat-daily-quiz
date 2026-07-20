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

        if (!fullName || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        try {

            setLoading(true);

            const data = await registerStudent(
                fullName,
                email,
                password
            );

            alert(data.message);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed."
            );

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
            />

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