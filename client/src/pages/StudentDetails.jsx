import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";
import { getStudentById } from "../services/adminService";

import "../styles/studentDetails.css";

export default function StudentDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    const [stats, setStats] = useState({
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
    });

    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {

        try {

            const data = await getStudentById(id);

            setStudent(data.student);

            setStats(data.stats);

            setHistory(data.history || []);

        } catch (err) {

            console.error(err);

        }

    };

    if (!student) {

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

    return (

        <>
            <AdminSidebar />

            <div className="student-details-page">

                <h1>Student Details</h1>

                <div className="student-card">

                    <h2>Profile</h2>

                    <p>
                        <strong>Name:</strong> {student.full_name}
                    </p>

                    <p>
                        <strong>Email:</strong> {student.email}
                    </p>

                    <p>
                        <strong>XP:</strong> {student.xp}
                    </p>

                    <p>
                        <strong>Level:</strong> {student.level}
                    </p>

                    <p>
                        <strong>Registered:</strong>{" "}
                        {new Date(student.created_at).toLocaleDateString()}
                    </p>

                </div>

                <div className="stats-grid">

                    <div className="stat-box">
                        <h2>{stats.totalAttempts}</h2>
                        <span>Total Attempts</span>
                    </div>

                    <div className="stat-box">
                        <h2>{stats.averageScore}</h2>
                        <span>Average Score</span>
                    </div>

                    <div className="stat-box">
                        <h2>{stats.highestScore}</h2>
                        <span>Highest Score</span>
                    </div>

                    <div className="stat-box">
                        <h2>{stats.lowestScore}</h2>
                        <span>Lowest Score</span>
                    </div>

                </div>

                <div className="history-card">

                    <h2>Quiz History</h2>

                    <table>

                        <thead>

                            <tr>

                                <th>Date</th>

                                <th>Score</th>

                                <th>Percentage</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.length === 0 ? (

                                <tr>

                                    <td colSpan="4">

                                        No quiz history found.

                                    </td>

                                </tr>

                            ) : (

                                history.map((quiz) => (

                                    <tr key={quiz.quiz_id}>

                                        <td>
                                            {new Date(
                                                quiz.quiz_date
                                            ).toLocaleDateString()}
                                        </td>

                                        <td>
                                            {quiz.score}/
                                            {quiz.total_questions}
                                        </td>

                                        <td>
                                            {quiz.percentage}%
                                        </td>

                                        <td>

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/students/${id}/attempt/${quiz.quiz_id}`
                                                    )
                                                }
                                            >
                                                View Attempt
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}