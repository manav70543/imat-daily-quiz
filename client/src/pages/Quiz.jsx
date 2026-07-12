import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getTodayQuiz } from "../services/quizService";

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const data = await getTodayQuiz();

      console.log("Quiz API:", data);

      // Backend returns { status: 200, quiz: {...} }
      setQuiz(data.quiz);
    } catch (err) {
      console.error(err);
      alert("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log("Selected Answers:", answers);

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Today's Quiz</h1>

        <p>Date: {quiz.quiz_date}</p>

        {quiz?.questions?.map((question, index) => (
          <div
            key={question.id}
            style={{
              border: "1px solid gray",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>
              {index + 1}. {question.question}
            </h3>

            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="A"
                checked={answers[question.id] === "A"}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [question.id]: "A",
                  })
                }
              />
              {" "}A. {question.option_a}
            </label>

            <br />
            <br />

            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="B"
                checked={answers[question.id] === "B"}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [question.id]: "B",
                  })
                }
              />
              {" "}B. {question.option_b}
            </label>

            <br />
            <br />

            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="C"
                checked={answers[question.id] === "C"}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [question.id]: "C",
                  })
                }
              />
              {" "}C. {question.option_c}
            </label>

            <br />
            <br />

            <label>
              <input
                type="radio"
                name={`question-${question.id}`}
                value="D"
                checked={answers[question.id] === "D"}
                onChange={() =>
                  setAnswers({
                    ...answers,
                    [question.id]: "D",
                  })
                }
              />
              {" "}D. {question.option_d}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}