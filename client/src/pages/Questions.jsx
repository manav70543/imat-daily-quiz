import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";

import {
    getQuestions,
    searchQuestions,
    filterBySubject,
    addQuestion,
    updateQuestion,
    deleteQuestion,
} from "../services/questionService";


import "../styles/adminQuestions.css";

export default function Questions() {

    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [subject, setSubject] = useState("");


    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalQuestions: 0,
        limit: 10
    });

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_option: "A",
        subject: "",
        difficulty: "Easy",
    });
    const [editingId, setEditingId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {

        if (search === "" && subject === "") {

            loadQuestions(page);

        }

    }, [page]);

    const loadQuestions = async (currentPage = 1) => {

        try {

            setLoading(true);

            const data = await getQuestions(
                currentPage,
                10
            );

            setQuestions(data.questions);

            setPagination(data.pagination);
            console.log("API Response:", data);
            console.log("Pagination:", data.pagination);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };
    const handleAddQuestion = async () => {

        try {

            let res;

            if (isEditing) {

                res = await updateQuestion(
                    editingId,
                    newQuestion
                );

            } else {

                res = await addQuestion(newQuestion);

            }

            if (res.status === 200 || res.status === 201) {

                alert(
                    isEditing
                        ? "Question updated successfully!"
                        : "Question added successfully!"
                );

                setShowModal(false);

                setIsEditing(false);

                setEditingId(null);

                setNewQuestion({
                    question: "",
                    option_a: "",
                    option_b: "",
                    option_c: "",
                    option_d: "",
                    correct_option: "A",
                    subject: "",
                    difficulty: "Easy",
                });

                loadQuestions(page);

            } else {

                alert(res.message);

            }

        } catch (err) {

            console.error(err);

            alert("Something went wrong.");

        }

    };


    const handleImportAll = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/api/admin/import-all",
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            alert(data.message);

            loadQuestions(page);

        } catch (err) {

            console.error(err);

            alert("Import failed.");

        }

    };
    const handleEdit = (question) => {

        setIsEditing(true);

        setEditingId(question.id);

        setNewQuestion({
            question: question.question,
            option_a: question.option_a,
            option_b: question.option_b,
            option_c: question.option_c,
            option_d: question.option_d,
            correct_option: question.correct_option,
            subject: question.subject,
            difficulty: question.difficulty,
        });

        setShowModal(true);
    };
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmDelete) return;

        try {

            const res = await deleteQuestion(id);

            if (res.status === 200) {

                alert("Question deleted successfully!");

                loadQuestions(page);
            } else {

                alert(res.message);

            }

        } catch (err) {

            console.error(err);

            alert("Something went wrong.");

        }

    };

    const handleSearch = async (value) => {

        setSearch(value);

        setSubject("");

        if (value.trim() === "") {

            setPage(1);

            loadQuestions(1);

            return;

        }

        try {

            const data = await searchQuestions(value);

            setQuestions(data.questions);

        } catch (err) {

            console.error(err);

        }

    };

    const handleSubjectFilter = async (value) => {

        setSubject(value);

        setSearch("");

        if (value === "") {

            setPage(1);

            loadQuestions(1);

            return;

        }

        try {

            const data = await filterBySubject(value);

            setQuestions(data.questions);

        } catch (err) {

            console.error(err);

        }

    };
    const changePage = (newPage) => {

        if (
            newPage < 1 ||
            newPage > pagination.totalPages
        ) {
            return;
        }

        setPage(newPage);

    };
    return (

        <div className="admin-layout">

            <AdminSidebar />

            <div className="admin-content">

                <div className="page-header">

                    <h1>Questions</h1>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        <button
                            className="import-btn"
                            onClick={handleImportAll}
                        >
                            Import All Questions
                        </button>

                        <button
                            className="add-btn"
                            onClick={() => {
                                setIsEditing(false);
                                setEditingId(null);

                                setNewQuestion({
                                    question: "",
                                    option_a: "",
                                    option_b: "",
                                    option_c: "",
                                    option_d: "",
                                    correct_option: "A",
                                    subject: "",
                                    difficulty: "Easy",
                                });

                                setShowModal(true);
                            }}
                        >
                            + Add Question
                        </button>
                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "20px"
                    }}
                >

                    <input
                        className="search-box"
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={(e) =>
                            handleSearch(e.target.value)
                        }
                    />

                    <select
                        className="filter-select"
                        value={subject}
                        onChange={(e) =>
                            handleSubjectFilter(e.target.value)
                        }
                    >

                        <option value="">All Subjects</option>

                        <option value="General Knowledge">
                            General Knowledge
                        </option>

                        <option value="Science">
                            Science
                        </option>

                        <option value="Mathematics">
                            Mathematics
                        </option>

                        <option value="Programming">
                            Programming
                        </option>

                        <option value="Computer Science">
                            Computer Science
                        </option>

                        <option value="Geography">
                            Geography
                        </option>

                        <option value="Literature">
                            Literature
                        </option>

                    </select>

                </div>

                <div
                    style={{
                        marginBottom: "15px",
                        fontWeight: "600",
                        color: "#475569"
                    }}
                >
                    Showing {questions.length} of {pagination.totalQuestions} questions
                </div>

                <div className="table-container">

                    <table className="questions-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Question</th>
                                <th>Subject</th>
                                <th>Difficulty</th>
                                <th>Correct</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="no-data"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : questions.length > 0 ? (

                                questions.map((question) => (

                                    <tr key={question.id}>

                                        <td>{question.id}</td>

                                        <td>{question.question}</td>

                                        <td>{question.subject}</td>

                                        <td>{question.difficulty}</td>

                                        <td>{question.correct_option}</td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(question)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(question.id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="no-data"
                                    >
                                        No Questions Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* ADD THIS BELOW */}
                <div className="pagination">

                    <button
                        onClick={() => changePage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </button>

                    {Array.from(
                        { length: pagination.totalPages },
                        (_, index) => (

                            <button
                                key={index}
                                onClick={() => changePage(index + 1)}
                                style={{
                                    background:
                                        page === index + 1
                                            ? "#111827"
                                            : "#2563eb",
                                    color: "#fff",
                                    padding: "8px 15px",
                                    border: "none",
                                    borderRadius: "6px"
                                }}
                            >
                                {index + 1}
                            </button>

                        )
                    )}

                    <button
                        onClick={() => changePage(page + 1)}
                        disabled={page === pagination.totalPages}
                    >
                        Next
                    </button>

                </div>



            </div>
            {showModal && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h2>
                            {isEditing ? "Edit Question" : "Add Question"}
                        </h2>

                        <input
                            type="text"
                            placeholder="Question"
                            value={newQuestion.question}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    question: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Option A"
                            value={newQuestion.option_a}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    option_a: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Option B"
                            value={newQuestion.option_b}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    option_b: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Option C"
                            value={newQuestion.option_c}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    option_c: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Option D"
                            value={newQuestion.option_d}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    option_d: e.target.value,
                                })
                            }
                        />

                        <select
                            value={newQuestion.correct_option}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    correct_option: e.target.value,
                                })
                            }
                        >
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Subject"
                            value={newQuestion.subject}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    subject: e.target.value,
                                })
                            }
                        />

                        <select
                            value={newQuestion.difficulty}
                            onChange={(e) =>
                                setNewQuestion({
                                    ...newQuestion,
                                    difficulty: e.target.value,
                                })
                            }
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>

                        <div className="modal-buttons">

                            <button
                                className="save-btn"
                                onClick={handleAddQuestion}
                            >
                                Save
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>

    );

}