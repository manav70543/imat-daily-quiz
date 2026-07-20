import React from "react";

export default function ReviewModal({
  showReview,
  review,
  currentQuestion,
  previousQuestion,
  nextQuestion,
  closeReview,
}) {
  if (!showReview || review.length === 0) return null;

  const question = review[currentQuestion];

  return (
    <div className="review-overlay">

      <div className="review-card">

        <h2>
          Question {currentQuestion + 1} / {review.length}
        </h2>

        <h3>{question.question}</h3>

        <div className="options">

          {Object.entries(question.options).map(([key, value]) => {

            const selected = question.selectedAnswer === key;
            const correct = question.correctAnswer === key;

            let className = "option";

            if (correct) className += " correct";

            if (selected && !correct) className += " wrong";

            return (
              <div
                key={key}
                className={className}
              >
                <strong>{key}.</strong> {value}
              </div>
            );

          })}

        </div>

        <div className="review-info">

          <p>
            <strong>Your Answer:</strong>{" "}
            {question.selectedAnswer}
          </p>

          <p>
            <strong>Correct Answer:</strong>{" "}
            {question.correctAnswer}
          </p>

          <p
            className={
              question.isCorrect
                ? "correct-text"
                : "wrong-text"
            }
          >
            {question.isCorrect
              ? "✔ Correct"
              : "✖ Wrong"}
          </p>

        </div>

        <div className="review-buttons">

          <button
            className="nav-btn"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          <button
            className="close-btn"
            onClick={closeReview}
          >
            Close
          </button>

          <button
            className="nav-btn"
            onClick={nextQuestion}
            disabled={
              currentQuestion === review.length - 1
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}