import API from "../api/axios";

// ========================
// Get Questions
// ========================
export const getQuestions = async (page = 1, limit = 10) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/questions?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return data;
};

// ========================
// Search Questions
// ========================
export const searchQuestions = async (keyword) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/questions/search?keyword=${keyword}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return data;
};

// ========================
// Filter By Subject
// ========================
export const filterBySubject = async (subject) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/questions/filter/subject?subject=${subject}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return data;
};

// ========================
// Add Question
// ========================
export const addQuestion = async (questionData) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.post(
        "/admin/questions",
        questionData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return data;
};

// ========================
// Update Question
// ========================
export const updateQuestion = async (id, questionData) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.put(
        `/admin/questions/${id}`,
        questionData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return data;
};

// ========================
// Delete Question
// ========================
export const deleteQuestion = async (id) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.delete(
        `/admin/questions/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return data;
};