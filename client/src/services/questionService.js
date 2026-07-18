import axios from "axios";

const API = "http://localhost:5000/api/admin";

// ========================
// Get Questions (Pagination)
// ========================
export const getQuestions = async (page = 1, limit = 10) => {

    const res = await axios.get(
        `${API}/questions?page=${page}&limit=${limit}`
    );

    return res.data;

};

// ========================
// Search Questions
// ========================
export const searchQuestions = async (keyword) => {

    const res = await axios.get(
        `${API}/questions/search?keyword=${keyword}`
    );

    return res.data;

};

// ========================
// Filter By Subject
// ========================
export const filterBySubject = async (subject) => {

    const res = await axios.get(
        `${API}/questions/filter/subject?subject=${subject}`
    );

    return res.data;

};

// ========================
// Add Question
// ========================
export const addQuestion = async (questionData) => {

    const res = await fetch(
        `${API}/questions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(questionData),
        }
    );

    return await res.json();

};

// ========================
// Update Question
// ========================
export const updateQuestion = async (id, questionData) => {

    const res = await fetch(
        `${API}/questions/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(questionData),
        }
    );

    return await res.json();

};

// ========================
// Delete Question
// ========================
export const deleteQuestion = async (id) => {

    const res = await fetch(
        `${API}/questions/${id}`,
        {
            method: "DELETE",
        }
    );

    return await res.json();

};