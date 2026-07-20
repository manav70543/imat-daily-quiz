import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        try {

            setLoading(true);

            const { data } = await axios.post(
                "http://localhost:5000/api/password/forgot-password",
                {
                    email
                }
            );

            alert(data.message);

            setEmail("");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);

        }

    };

   return (

    <div className="login-page">

        <div className="login-card">

            <h1>Forgot Password</h1>

            <p className="login-subtitle">
                Enter your registered email address to receive a password reset link.
            </p>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                className="login-btn"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="login-register">
                <Link to="/">
                    Back to Login
                </Link>
            </p>

        </div>

    </div>

);

}