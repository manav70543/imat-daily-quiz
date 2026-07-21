import { useEffect, useState } from "react";
import ReviewModal from "../components/ReviewModal";

import {
  getStudentHistory,
  getQuizAttemptDetails
} from "../services/quizService";

import "../styles/history.css";

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

      <div className="history-container">

        <h1 className="history-title">
          Quiz History
        </h1>

        <p className="history-subtitle">
          View all your previous quiz attempts.
        </p>

        {loading ? (

          <h3>Loading...</h3>

        ) : history.length === 0 ? (

          <h3>No quiz attempts found.</h3>

        ) : (

          <table className="history-table">

            <thead>

              <tr>

                <th>Date</th>
                <th>Score</th>
                <th>Total</th>
                <th>Percentage</th>
                <th>Result</th>
                <th>Review</th>

              </tr>

            </thead>

            <tbody>

              {history.map((quiz) => (

                <tr key={quiz.quiz_id}>

                  <td>
                    {new Date(
                      quiz.quiz_date
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {quiz.score}
                  </td>

                  <td>
                    {quiz.total_questions}
                  </td>

                  <td>
                    {quiz.percentage}%
                  </td>

                  <td
                    className={
                      quiz.percentage >= 60
                        ? "pass"
                        : "fail"
                    }
                  >
                    {quiz.percentage >= 60
                      ? "PASS"
                      : "FAIL"}
                  </td>

                  <td>

                    <button
                      className="review-btn"
                      onClick={() =>
                        handleReview(
                          quiz.quiz_id
                        )
                      }
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

      <ReviewModal
        showReview={showReview}
        review={review}
        currentQuestion={currentQuestion}
        previousQuestion={previousQuestion}
        nextQuestion={nextQuestion}
        closeReview={closeReview}
      />

    </>
  );

}