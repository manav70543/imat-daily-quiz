import API from "../api/axios";

// ==========================
// Get All Quizzes
// ==========================
export const getAllQuizzes = async () => {
    const token = localStorage.getItem("adminToken");

    const { data } = await API.get("/admin/quizzes", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};

// ==========================
// Generate Today's Quiz
// ==========================
export const createQuiz = async () => {
    const token = localStorage.getItem("adminToken");

    const { data } = await API.post(
        "/admin/quiz/generate",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

// ==========================
// Get Quiz Details
// ==========================
export const getQuizDetails = async (id) => {
    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/quizzes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

// ==========================
// Delete Quiz
// ==========================
export const deleteQuiz = async (id) => {
    const token = localStorage.getItem("adminToken");

    const { data } = await API.delete(
        `/admin/quizzes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};

// ==========================
// Get Students Attempted Quiz
// ==========================
export const getQuizStudents = async (quizId) => {
    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/quizzes/${quizId}/students`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;
};