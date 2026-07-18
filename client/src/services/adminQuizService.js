import axios from "axios";

// Quiz Management (List, Details, Delete, Students)
const QUIZ_API = "http://localhost:5000/api/admin/quizzes";

// Daily Quiz Generation
const DAILY_API = "http://localhost:5000/api/admin/quiz";

// ==========================
// Get All Quizzes
// ==========================
export const getAllQuizzes = async () => {

    const token = localStorage.getItem("adminToken");

    const res = await axios.get(
        QUIZ_API,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;

};

// ==========================
// Generate Today's Quiz
// ==========================
export const createQuiz = async () => {

    const token = localStorage.getItem("adminToken");

    const res = await axios.post(
        `${DAILY_API}/generate`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;

};

// ==========================
// Get Quiz Details
// ==========================
export const getQuizDetails = async (id) => {

    const token = localStorage.getItem("adminToken");

    const res = await axios.get(
        `${QUIZ_API}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;

};

// ==========================
// Delete Quiz
// ==========================
export const deleteQuiz = async (id) => {

    const token = localStorage.getItem("adminToken");

    const res = await axios.delete(
        `${QUIZ_API}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;

};

// ==========================
// Get Students
// ==========================
export const getQuizStudents = async (quizId) => {

    const token = localStorage.getItem("adminToken");

    const res = await axios.get(
        `${QUIZ_API}/${quizId}/students`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;

};