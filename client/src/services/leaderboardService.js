import API from "../api/axios";

export const getLeaderboard = async () => {
    const response = await API.get("/quizzes/leaderboard");
    return response.data;
};