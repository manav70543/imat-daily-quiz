import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

import { getQuizDetails } from "../services/adminQuizService";

import "../styles/adminQuizDetails.css";

export default function QuizDetails() {

    const { id } = useParams();

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        loadQuiz();
    }, []);

    const loadQuiz = async () => {

        try {

            const data =
                await getQuizDetails(id);

            setQuestions(data.questions);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <h1>Quiz Details</h1>

                {

                    questions.map((question, index) => (

                        <div
                            key={question.id}
                            className="question-card"
                        >

                            <h2>
                                Question {index + 1}
                            </h2>

                            <p className="question-text">
                                {question.question}
                            </p>

                            <ul>

                                <li>A. {question.option_a}</li>

                                <li>B. {question.option_b}</li>

                                <li>C. {question.option_c}</li>

                                <li>D. {question.option_d}</li>

                            </ul>

                            <p>
                                <strong>Correct Answer:</strong>{" "}
                                {question.correct_option}
                            </p>

                            <p>
                                <strong>Subject:</strong>{" "}
                                {question.subject}
                            </p>

                            <p>
                                <strong>Difficulty:</strong>{" "}
                                {question.difficulty}
                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}