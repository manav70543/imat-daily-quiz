import API from "../api/axios";

// ==========================
// Today's Quiz
// ==========================
export const getTodayQuiz = async () => {
    const response = await API.get("/quizzes/today");
    return response.data;
};

// ==========================
// Submit Quiz
// ==========================
export const submitQuiz = async (answers) => {
    const response = await API.post("/quizzes/submit", answers);
    return response.data;
};

// ==========================
// Student Dashboard
// ==========================
export const getStudentDashboard = async () => {
    const response = await API.get("/quizzes/student/dashboard");
    return response.data;
};

// ==========================
// Weekly Performance
// ==========================
export const getWeeklyPerformance = async () => {
    const response = await API.get("/quizzes/student/weekly-performance");
    return response.data;
};

// ==========================
// Subject Performance
// ==========================
export const getSubjectPerformance = async () => {
    const response = await API.get("/quizzes/student/subjects");
    return response.data;
};

// ==========================
// Current Streak
// ==========================
export const getCurrentStreak = async () => {
    const response = await API.get("/quizzes/student/streak");
    return response.data;
};

// ==========================
// Achievements
// ==========================
export const getAchievements = async () => {
    const response = await API.get("/quizzes/student/achievements");
    return response.data;
};

// ==========================
// Student XP
// ==========================
export const getStudentXP = async () => {
    const { data } = await API.get("/quizzes/student/xp");
    return data;
};

// ==========================
// Student Profile
// ==========================
export const getStudentProfile = async () => {
    const { data } = await API.get("/quizzes/student/profile");
    return data;
};

// ==========================
// Student History
// ==========================
export const getStudentHistory = async () => {
    const { data } = await API.get("/quizzes/student/history");
    return data.history;
};

// ==========================
// Quiz Attempt Details
// ==========================
export const getQuizAttemptDetails = async (quizId) => {
    const { data } = await API.get(`/quizzes/history/${quizId}`);
    return data;
};