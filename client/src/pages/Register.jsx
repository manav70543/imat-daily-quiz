import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerStudent } from "../services/authService";

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

                <h1 style={{ marginBottom: "20px" }}>
                    IMAT Daily Quiz
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                    }}
                />

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
                    onClick={handleRegister}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        opacity: loading ? 0.7 : 1,
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                    }}
                >
                    Already have an account?{" "}
                    <Link to="/">
                        Login
                    </Link>
                </p>

            </div>

        </div>

    );

}