import ProgressCircle from "../components/ProgressCircle";
import { useEffect, useState } from "react";
import "../styles/quiz.css";


import Navbar from "../components/Navbar";
import { FaCalendarAlt } from "react-icons/fa";
import { getTodayQuiz, submitQuiz } from "../services/quizService";

export default function Quiz() {

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});

    // New state
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [review, setReview] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {

        try {

            const data = await getTodayQuiz();

            console.log(data);

            if (data.alreadySubmitted) {

                setAlreadySubmitted(true);
                setResult(data.result);
                setReview(data.result.review || []);

            } else {

                setQuiz(data.quiz);

            }

        } catch (error) {

            console.error(error);
            alert("Failed to load quiz");

        } finally {

            setLoading(false);

        }

    };

    const handleAnswerChange = (questionId, option) => {

        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));

    };

    const handleSubmit = async () => {

        try {

            const formattedAnswers = Object.entries(answers).map(
                ([question_id, selected_option]) => ({
                    question_id: Number(question_id),
                    selected_option
                })
            );

            const response = await submitQuiz({
                quiz_id: quiz.id,
                answers: formattedAnswers
            });
            console.log(response);

            setAlreadySubmitted(true);

            setResult({
                score: response.score,
                total: response.total,
                percentage: response.percentage
            });

            setReview(response.review);

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to submit quiz"
            );

        }

    };

    if (loading) {

        return (
            <>
                <Navbar />
                <div className="quiz-container">
                    <h2>Loading...</h2>
                </div>
            </>
        );

    }

    // Student already submitted today's quiz
    const scoreColor =
        result?.percentage >= 80
            ? "#22c55e"
            : result?.percentage >= 50
                ? "#f59e0b"
                : "#ef4444";

    const resultMessage =
        result.percentage >= 90
            ? "Outstanding! 🎉"
            : result.percentage >= 70
                ? "Excellent work! 👏"
                : result.percentage >= 50
                    ? "Good effort! Keep practicing."
                    : "Don't worry. Practice more and you'll improve! 💪";

    if (alreadySubmitted) {

        return (
            <>
                <Navbar />

                <div className="quiz-container">

                    <div className="result-card">

                        <div className="result-icon">
                            🎉
                        </div>

                        <h2>Quiz Completed!</h2>

                        <p className="result-message">
                            {resultMessage}
                        </p>

                        <ProgressCircle
                            percentage={result.percentage}
                            score={result.score}
                            total={result.total}
                            color={scoreColor}
                        />

                        <p className="result-footer">
                            Come back tomorrow for a new quiz 🚀
                        </p>

                    </div>

                    <h2 style={{ marginTop: 40 }}>
                        Review Answers
                    </h2>

                    {review.map((item, index) => (

                        <div
                            key={item.questionId}
                            className="quiz-card"
                        >

                            <h3>
                                {index + 1}. {item.question}
                            </h3>

                            {["A", "B", "C", "D"].map(option => {

                                const text =
                                    item[`option_${option.toLowerCase()}`];

                                let className = "option";

                                if (option === item.correctAnswer)
                                    className += " correct-option";

                                if (
                                    option === item.yourAnswer &&
                                    option !== item.correctAnswer
                                )
                                    className += " wrong-option";

                                return (

                                    <div
                                        key={option}
                                        className={className}
                                    >
                                        <strong>{option}.</strong> {text}
                                    </div>

                                );

                            })}
                            <p style={{ marginTop: 15 }}>

                                <strong>Your Answer:</strong>{" "}
                                {item.yourAnswer === "Not Answered"
                                    ? "Not Answered"
                                    : item[`option_${item.yourAnswer.toLowerCase()}`]}

                                <br />

                                <strong>Correct Answer:</strong>{" "}
                                {item[`option_${item.correctAnswer.toLowerCase()}`]}

                            </p>

                            <div
                                style={{
                                    marginTop: 12,
                                    fontWeight: "bold",
                                    color: item.correct ? "#16a34a" : "#dc2626"
                                }}
                            >
                                {item.correct ? "✅ Correct Answer" : "❌ Wrong Answer"}
                            </div>

                        </div>

                    ))}

                </div>

            </>
        );

    }

    if (!quiz) {

        return (
            <>
                <Navbar />
                <div style={{ padding: 30 }}>
                    <h2>No Quiz Available</h2>
                </div>
            </>
        );

    }

    return (
        <>
            <Navbar />

            <div className="quiz-container">

                <div className="quiz-header">

                    <h1>🧠 Today's Quiz</h1>

                    <p>
                        <FaCalendarAlt />
                        {" "}
                        {new Date(quiz.quiz_date).toLocaleDateString()}
                    </p>

                </div>

                {quiz.questions.map((question, index) => (

                    <div
                        key={question.id}
                        className="quiz-card"
                    >

                        <h3>
                            {index + 1}. {question.question}
                        </h3>

                        {["A", "B", "C", "D"].map((option) => (

                            <label
                                key={option}
                                className="option"
                            >

                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    checked={answers[question.id] === option}
                                    onChange={() =>
                                        handleAnswerChange(
                                            question.id,
                                            option
                                        )
                                    }
                                />

                                {" "}

                                {option}. {question[`option_${option.toLowerCase()}`]}

                            </label>

                        ))}

                    </div>

                ))}

                <div
                    style={{
                        textAlign: "center",
                        marginTop: 40
                    }}
                >

                    <button
                        onClick={handleSubmit}
                        className="submit-btn"
                    >
                        Submit Quiz
                    </button>
                </div>

            </div>
        </>
    );
}