import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getStudentHistory,
    getQuizAttemptDetails
} from "../services/quizService";

export default function History() {

    const [history, setHistory] = useState([]);
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showReview, setShowReview] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {

        try {

            const data = await getStudentHistory();

            console.log("History API:", data);

            // Correct response:
            // {
            //   status:200,
            //   history:[...]
            // }

            setHistory(data.history || []);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const handleReview = async (quizId) => {

        try {

            const data = await getQuizAttemptDetails(quizId);

            console.log("Review API:", data);

            setReview(data.questions || []);
            setCurrentQuestion(0);
            setShowReview(true);

        } catch (err) {

            console.error(err);

        }

    };

    const closeReview = () => {

        setShowReview(false);
        setReview([]);
        setCurrentQuestion(0);

    };

    const nextQuestion = () => {

        if (currentQuestion < review.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }

    };

    const previousQuestion = () => {

        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
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
                                <th style={{ padding: "15px" }}>Date</th>
                                <th style={{ padding: "15px" }}>Score</th>
                                <th style={{ padding: "15px" }}>Total</th>
                                <th style={{ padding: "15px" }}>Percentage</th>
                                <th style={{ padding: "15px" }}>Result</th>
                                <th style={{ padding: "15px" }}>Review</th>
                            </tr>
                        </thead>

                        <tbody>

                            {history.map((quiz) => (

                                <tr
                                    key={quiz.quiz_id}
                                    style={{
                                        textAlign: "center",
                                        borderBottom: "1px solid #ddd"
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
                                            fontWeight: "bold",
                                            color:
                                                quiz.percentage >= 60
                                                    ? "green"
                                                    : "red"
                                        }}
                                    >
                                        {quiz.percentage >= 60
                                            ? "PASS"
                                            : "FAIL"}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        <button
                                            onClick={() =>
                                                handleReview(
                                                    quiz.quiz_id
                                                )
                                            }
                                            style={{
                                                padding: "8px 18px",
                                                border: "none",
                                                borderRadius: "6px",
                                                background: "#2563eb",
                                                color: "#fff",
                                                cursor: "pointer"
                                            }}
                                        >
                                            View Review
                                        </button>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            {showReview && review.length > 0 && (

                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            width: "850px",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "30px"
                        }}
                    >
                        <h2>
                            Question {currentQuestion + 1} / {review.length}
                        </h2>

                        <h3 style={{ marginTop: "20px" }}>
                            {review[currentQuestion].question}
                        </h3>

                        <div style={{ marginTop: "25px" }}>

                            {Object.entries(review[currentQuestion].options).map(
                                ([key, value]) => {

                                    const selected =
                                        review[currentQuestion].selectedAnswer === key;

                                    const correct =
                                        review[currentQuestion].correctAnswer === key;

                                    let background = "#fff";
                                    let border = "#ddd";

                                    if (correct) {
                                        background = "#d1fae5";
                                        border = "green";
                                    }

                                    if (selected && !correct) {
                                        background = "#fee2e2";
                                        border = "red";
                                    }

                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                padding: "15px",
                                                marginBottom: "10px",
                                                border: `2px solid ${border}`,
                                                borderRadius: "8px",
                                                background
                                            }}
                                        >
                                            <strong>{key}.</strong> {value}
                                        </div>
                                    );

                                }
                            )}

                        </div>

                        <div
                            style={{
                                marginTop: "20px",
                                lineHeight: "2"
                            }}
                        >
                            <p>
                                <strong>Your Answer:</strong>{" "}
                                {review[currentQuestion].selectedAnswer}
                            </p>

                            <p>
                                <strong>Correct Answer:</strong>{" "}
                                {review[currentQuestion].correctAnswer}
                            </p>

                            <p
                                style={{
                                    color:
                                        review[currentQuestion].isCorrect
                                            ? "green"
                                            : "red",
                                    fontWeight: "bold"
                                }}
                            >
                                {review[currentQuestion].isCorrect
                                    ? "✔ Correct"
                                    : "✖ Wrong"}
                            </p>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "30px"
                            }}
                        >
                            <button
                                onClick={previousQuestion}
                                disabled={currentQuestion === 0}
                                style={{
                                    padding: "10px 20px"
                                }}
                            >
                                Previous
                            </button>

                            <button
                                onClick={closeReview}
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "6px",
                                    background: "#ef4444",
                                    color: "#fff"
                                }}
                            >
                                Close
                            </button>

                            <button
                                onClick={nextQuestion}
                                disabled={currentQuestion === review.length - 1}
                                style={{
                                    padding: "10px 20px"
                                }}
                            >
                                Next
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}