import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllQuizzes,
    createQuiz,
    deleteQuiz,
} from "../services/adminQuizService";

import AdminSidebar from "../components/AdminSidebar";

import "../styles/adminQuizzes.css";

export default function Quizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        try {
            setLoading(true);

            const data = await getAllQuizzes();

            setQuizzes(data.quizzes || []);
        } catch (err) {
            console.error("Failed to load quizzes:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateQuiz = async () => {

    try {

        const res = await createQuiz();

        if (res.alreadyExists) {

            alert("Today's quiz already exists.");

        } else {

            alert(
                `${res.totalQuestions} questions generated successfully.`
            );

        }

        await loadQuizzes();

    } catch (err) {

        console.error(err);

        alert(
            err.response?.data?.message ||
            "Failed to generate quiz."
        );

    }

};

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this quiz?"
        );

        if (!confirmDelete) return;

        try {

            await deleteQuiz(id);

            loadQuizzes();

            alert("Quiz deleted successfully.");

        } catch (err) {

            console.error(err);

            console.log("Status:", err.response?.status);
            console.log("Data:", err.response?.data);

            alert(
                err.response?.data?.message ||
                err.message ||
                "Failed to delete quiz."
            );

        }

    };
    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <div className="quiz-header">
                    <h1>Daily Quizzes</h1>

                    <button
                        className="generate-btn"
                        onClick={handleGenerateQuiz}
                    >
                        + Generate Today's Quiz
                    </button>
                </div>

                {loading ? (
                    <p>Loading quizzes...</p>
                ) : (
                    <table className="quiz-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Questions</th>
                                <th>Attempts</th>
                                <th>Average Score</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {quizzes.length === 0 ? (
                                <tr>
                                    <td colSpan="5">
                                        No quizzes available.
                                    </td>
                                </tr>
                            ) : (
                                quizzes.map((quiz) => (
                                    <tr key={quiz.id}>
                                        <td>
                                            {new Date(
                                                quiz.quiz_date
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>{quiz.total_questions}</td>

                                        <td>{quiz.total_attempts}</td>

                                        <td>
                                            {quiz.average_score ?? 0}%
                                        </td>

                                        <td>

                                            <button
                                                className="view-btn"
                                                onClick={() => navigate(`/admin/quizzes/${quiz.id}`)}
                                            >
                                                Questions
                                            </button>

                                            <button
                                                className="view-btn"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() =>
                                                    navigate(`/admin/quizzes/${quiz.id}/students`)
                                                }
                                            >
                                                Students
                                            </button>

                                            <button
                                                className="delete-btn"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() => handleDelete(quiz.id)}
                                            >
                                                Delete
                                            </button>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}