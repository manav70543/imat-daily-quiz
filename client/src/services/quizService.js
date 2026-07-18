import API from "../api/axios";

export const getTodayQuiz = async () => {
    const response = await API.get("/quiz/today");
    return response.data;
};

export const submitQuiz = async (answers) => {
    const response = await API.post("/quiz/submit", answers);
    return response.data;
};
export const getStudentDashboard = async () => {
    const response = await API.get("/quiz/student/dashboard");
    return response.data;
};
export const getWeeklyPerformance = async () => {
    const response = await API.get("/quiz/student/weekly-performance");
    return response.data;
};
export const getSubjectPerformance = async () => {

    const response =
        await API.get("/quiz/student/subjects");

    return response.data;

};
export const getCurrentStreak = async () => {
    const response = await API.get("/quiz/student/streak");
    return response.data;
};
export const getAchievements = async () => {

    const response =
        await API.get("/quiz/student/achievements");

    return response.data;

};
export const getStudentXP = async () => {
  const { data } = await API.get("/quiz/student/xp");
  return data;
};
export const getStudentProfile = async () => {
    const { data } = await API.get("/quiz/student/profile");
    return data;
};
export const getStudentHistory = async () => {
    const { data } = await API.get("/quiz/student/history");
    return data;
};
