import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getQuizStudents } from "../services/adminQuizService";

import AdminSidebar from "../components/AdminSidebar";

import "../styles/adminQuizzes.css";

export default function QuizStudents() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadStudents();

    }, []);

    const loadStudents = async () => {

        try {

            const data = await getQuizStudents(id);

            setStudents(data.students || []);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <div className="quiz-header">

                    <h1>Quiz Attempts</h1>

                    <button
                        className="generate-btn"
                        onClick={() => navigate("/admin/quizzes")}
                    >
                        ← Back
                    </button>

                </div>

                {loading ? (

                    <p>Loading...</p>

                ) : (

                    <table className="quiz-table">

                        <thead>

                            <tr>

                                <th>Name</th>
                                <th>Email</th>
                                <th>Score</th>
                                <th>Total Questions</th>
                                <th>Percentage</th>

                            </tr>

                        </thead>

                        <tbody>

                            {students.length === 0 ? (

                                <tr>

                                    <td colSpan="5">
                                        No students attempted this quiz.
                                    </td>

                                </tr>

                            ) : (

                                students.map(student => (

                                    <tr key={student.id}>

                                        <td>{student.full_name}</td>

                                        <td>{student.email}</td>

                                        <td>{student.score}</td>

                                        <td>{student.total_questions}</td>

                                        <td>{student.percentage}%</td>

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