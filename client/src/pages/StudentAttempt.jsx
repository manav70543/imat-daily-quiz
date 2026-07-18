import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import { getStudentAttempt } from "../services/adminService";

import "../styles/studentAttempt.css";

export default function StudentAttempt() {
    const { studentId, quizId } = useParams();
    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAttempt();
    }, []);

    const loadAttempt = async () => {
        try {
            const data = await getStudentAttempt(studentId, quizId);
            setAttempts(data.attempts || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <AdminSidebar />
                <div
                    style={{
                        marginLeft: "280px",
                        padding: "40px",
                    }}
                >
                    <h2>Loading...</h2>
                </div>
            </>
        );
    }

    const total = attempts.length;

    const correct = attempts.filter(
        (q) => q.selected_option === q.correct_option
    ).length;

    const wrong = total - correct;

    const percentage =
        total > 0
            ? ((correct / total) * 100).toFixed(2)
            : 0;

    const getOptionClass = (letter, q) => {
        if (letter === q.correct_option) {
            return "option correct-option";
        }

        if (
            letter === q.selected_option &&
            q.selected_option !== q.correct_option
        ) {
            return "option wrong-option";
        }

        return "option";
    };

    return (
        <>
            <AdminSidebar />

            <div className="student-attempt-page">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <h1>Student Attempt Review</h1>

                {total > 0 && (
                    <div className="summary-card">

                        <div className="summary-box">
                            <h2>{correct}</h2>
                            <span>Correct</span>
                        </div>

                        <div className="summary-box">
                            <h2>{wrong}</h2>
                            <span>Wrong</span>
                        </div>

                        <div className="summary-box">
                            <h2>
                                {correct}/{total}
                            </h2>
                            <span>Score</span>
                        </div>

                        <div className="summary-box">
                            <h2>{percentage}%</h2>
                            <span>Percentage</span>
                        </div>

                    </div>
                )}

                {attempts.length === 0 ? (
                    <div className="attempt-card">
                        <h3>No attempt found.</h3>
                    </div>
                ) : (
                    attempts.map((q, index) => (
                        <div
                            key={q.id}
                            className="attempt-card"
                        >
                            <h2>
                                Question {index + 1}
                            </h2>

                            <p className="question">
                                {q.question}
                            </p>

                            <div
                                className={getOptionClass(
                                    "A",
                                    q
                                )}
                            >
                                <strong>A.</strong> {q.option_a}
                            </div>

                            <div
                                className={getOptionClass(
                                    "B",
                                    q
                                )}
                            >
                                <strong>B.</strong> {q.option_b}
                            </div>

                            <div
                                className={getOptionClass(
                                    "C",
                                    q
                                )}
                            >
                                <strong>C.</strong> {q.option_c}
                            </div>

                            <div
                                className={getOptionClass(
                                    "D",
                                    q
                                )}
                            >
                                <strong>D.</strong> {q.option_d}
                            </div>

                            <div className="attempt-info">
                                <p>
                                    <strong>Student Selected:</strong>{" "}
                                    {q.selected_option}
                                </p>

                                <p>
                                    <strong>Correct Answer:</strong>{" "}
                                    {q.correct_option}
                                </p>
                            </div>

                            <div
                                className={
                                    q.selected_option ===
                                    q.correct_option
                                        ? "result-badge correct-badge"
                                        : "result-badge wrong-badge"
                                }
                            >
                                {q.selected_option ===
                                q.correct_option
                                    ? "✔ Correct"
                                    : "✘ Wrong"}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}