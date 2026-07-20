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
    const [currentQuestion, setCurrentQuestion] = useState(0);

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

        if (currentQuestion < totalQuestions - 1) {
            setTimeout(() => {
                setCurrentQuestion(prev => prev + 1);
            }, 200);
        }

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


    if (alreadySubmitted) {
        // Student already submitted today's quiz
        const scoreColor =
            result?.percentage >= 80
                ? "#22c55e"
                : result?.percentage >= 50
                    ? "#f59e0b"
                    : "#ef4444";

        const resultMessage =
            result?.percentage >= 90
                ? "Outstanding! 🎉"
                : result?.percentage >= 70
                    ? "Excellent work! 👏"
                    : result?.percentage >= 50
                        ? "Good effort! Keep practicing."
                        : "Don't worry. Practice more and you'll improve! 💪";

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

                    <h2
                        className="review-title"
                        style={{ marginTop: 40 }}
                    >
                        Review Answers
                    </h2>

                    {review.map((item, index) => (

                        <div
                            key={item.questionId}
                            className="quiz-card"
                        >

                            <h3 className="review-question">
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
                                console.log({
                                    option,
                                    text,
                                    yourAnswer: item.yourAnswer,
                                    correctAnswer: item.correctAnswer
                                });
                                return (

                                    <div
                                        key={option}
                                        className={className}
                                        style={{
                                            background:
                                                option === item.correctAnswer
                                                    ? "limegreen"
                                                    : option === item.yourAnswer
                                                        ? "red"
                                                        : "white",
                                            color: "black"
                                        }}
                                    >
                                        <strong>{option}.</strong>{" "}
                                        {text}
                                    </div>

                                );

                            })}
                            <p
                                className="review-answer"
                                style={{ marginTop: 15 }}
                            >

                                <strong>Your Answer:</strong>{" "}
                                {item.yourAnswer === "Not Answered"
                                    ? "Not Answered"
                                    : item[`option_${item.yourAnswer.toLowerCase()}`]}

                                <br />

                                <strong>Correct Answer:</strong>{" "}
                                {item[`option_${item.correctAnswer.toLowerCase()}`]}

                            </p>

                            <div
                                className={
                                    item.correct
                                        ? "review-status correct-status"
                                        : "review-status wrong-status"
                                }
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
    const totalQuestions = quiz.questions.length;

    const answeredQuestions = Object.keys(answers).length;

    const progress =
        (answeredQuestions / totalQuestions) * 100;

    const question =
        quiz.questions[currentQuestion];

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

                <div className="progress-section">

                    <div className="progress-info">

                        <span>
                            Progress
                        </span>

                        <span>
                            {answeredQuestions} / {totalQuestions} Answered
                        </span>

                    </div>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width: `${progress}%`
                            }}
                        />

                    </div>
                    <div
                        style={{
                            marginTop: 12,
                            display: "flex",
                            justifyContent: "space-between",
                            color: "var(--text-light)",
                            fontWeight: 600
                        }}
                    >
                        <span>Answered: {answeredQuestions}</span>

                        <span>Remaining: {totalQuestions - answeredQuestions}</span>
                    </div>

                </div>

                <div className="quiz-card">

                    <div className="question-number">

                        Question {currentQuestion + 1} of {totalQuestions}

                    </div>

                    <h3>{question.question}</h3>

                    {["A", "B", "C", "D"].map(option => (

                        <label
                            key={option}
                            className={`option ${answers[question.id] === option
                                ? "selected-option"
                                : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={answers[question.id] === option}
                                onChange={() =>
                                    handleAnswerChange(question.id, option)
                                }
                            />

                            {option}. {question[`option_${option.toLowerCase()}`]}

                        </label>

                    ))}

                </div> {/* End quiz-card */}

                <div className="navigation-buttons">

                    <button
                        className="nav-btn"
                        disabled={currentQuestion === 0}
                        onClick={() =>
                            setCurrentQuestion(prev => prev - 1)
                        }
                    >
                        ← Previous
                    </button>

                    <button
                        className="nav-btn"
                        disabled={currentQuestion === totalQuestions - 1}
                        onClick={() =>
                            setCurrentQuestion(prev => prev + 1)
                        }
                    >
                        Next →
                    </button>

                </div>

                <div className="question-palette">

                    <h3>Question Palette</h3>

                    <div className="palette-grid">

                        {quiz.questions.map((q, index) => {

                            let className = "palette-btn";

                            if (index === currentQuestion)
                                className += " current";
                            else if (answers[q.id])
                                className += " answered";

                            return (
                                <button
                                    key={q.id}
                                    className={className}
                                    onClick={() =>
                                        setCurrentQuestion(index)
                                    }
                                >
                                    {index + 1}
                                </button>
                            );

                        })}

                    </div>

                </div>

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
                        Finish Quiz
                    </button>
                </div>

            </div> {/* End quiz-container */}

        </>
    );
}