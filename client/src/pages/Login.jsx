import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent } from "../services/authService";

export default function Login() {
    const navigate = useNavigate();

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

            console.log("LOGIN RESPONSE:", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("student", JSON.stringify(data.student));
            localStorage.setItem("student_id", data.student.id);

            console.log("Stored student_id:", localStorage.getItem("student_id"));

            navigate("/dashboard");
            navigate("/dashboard");
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
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f7fb",
            }}
        >
            <div
                style={{
                    width: "400px",
                    background: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
            >
                <h1 style={{ marginBottom: "20px" }}>IMAT Daily Quiz</h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px",
                    }}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
}