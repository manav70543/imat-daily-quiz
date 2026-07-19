import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleReset = async () => {

        if (!password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {

            setLoading(true);

            const { data } = await axios.post(
                `http://localhost:5000/api/password/reset-password/${token}`,
                {
                    password
                }
            );

            alert(data.message);

            navigate("/");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Password reset failed."
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

                <h1>Reset Password</h1>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "20px",
                        marginBottom: "15px",
                        boxSizing: "border-box"
                    }}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
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
                    onClick={handleReset}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    {loading
                        ? "Resetting..."
                        : "Reset Password"}
                </button>

            </div>

        </div>

    );

}