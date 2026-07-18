import API from "../api/axios";

// ================= Dashboard =================

export const getDashboardStats = async () => {
    const token = localStorage.getItem("adminToken");

    const { data } = await API.get("/admin/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};

// ================= Students =================

export const getStudents = async (
    page = 1,
    limit = 10
) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/students?page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;

};

export const searchStudents = async (
    keyword,
    page = 1,
    limit = 10
) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/students/search?search=${keyword}&page=${page}&limit=${limit}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;

};

export const getStudentById = async (id) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/students/${id}/details`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;

};

export const getRecentStudents = async () => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        "/admin/recent-students",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;

};

export const getStudentAttempt = async (
    studentId,
    quizId
) => {

    const token = localStorage.getItem("adminToken");

    const { data } = await API.get(
        `/admin/students/${studentId}/attempt/${quizId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return data;

};