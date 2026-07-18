import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getStudentHistory } from "../services/quizService";

export default function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const data = await getStudentHistory();

            setHistory(data.history || []);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    return (
        <>
            <Navbar />

            <div
                style={{
                    padding: "30px",
                    maxWidth: "1100px",
                    margin: "0 auto"
                }}
            >
                <h1 style={{ marginBottom: "10px" }}>
                    Quiz History
                </h1>

                <p style={{ marginBottom: "25px" }}>
                    View all your previous quiz attempts.
                </p>

                {loading ? (

                    <h3>Loading...</h3>

                ) : history.length === 0 ? (

                    <h3>No quiz attempts found.</h3>

                ) : (

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
                        }}
                    >
                        <thead>

                            <tr
                                style={{
                                    background: "#2563eb",
                                    color: "#fff"
                                }}
                            >
                                <th style={{ padding: "15px" }}>
                                    Date
                                </th>

                                <th style={{ padding: "15px" }}>
                                    Score
                                </th>

                                <th style={{ padding: "15px" }}>
                                    Total
                                </th>

                                <th style={{ padding: "15px" }}>
                                    Percentage
                                </th>

                                <th style={{ padding: "15px" }}>
                                    Result
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {history.map((quiz, index) => (

                                <tr
                                    key={index}
                                    style={{
                                        textAlign: "center",
                                        borderBottom:
                                            "1px solid #ddd"
                                    }}
                                >
                                    <td style={{ padding: "15px" }}>
                                        {new Date(
                                            quiz.quiz_date
                                        ).toLocaleDateString()}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        {quiz.score}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        {quiz.total_questions}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        {quiz.percentage}%
                                    </td>

                                    <td
                                        style={{
                                            padding: "15px",
                                            color:
                                                quiz.percentage >= 60
                                                    ? "green"
                                                    : "red",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {quiz.percentage >= 60
                                            ? "PASS"
                                            : "FAIL"}
                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>
        </>
    );
}