import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f7fb"
            }}
        >

            <div
                style={{
                    width: "420px",
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0,0,0,.1)"
                }}
            >

                <h1>Forgot Password</h1>

                <p style={{ marginBottom: 20 }}>
                    Enter your registered email address.
                </p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                        boxSizing: "border-box"
                    }}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px"
                    }}
                >
                    <Link to="/">
                        Back to Login
                    </Link>
                </p>

            </div>

        </div>

    );

}