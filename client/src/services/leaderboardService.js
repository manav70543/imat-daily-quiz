import API from "../api/axios";

export const getLeaderboard = async () => {
    const response = await API.get("/quiz/leaderboard");
    return response.data;
};