import API from "../api/axios";

export const getTodayQuiz = async () => {
  const response = await API.get("/quiz/today");
  return response.data;
};

export const submitQuiz = async (answers) => {
  const response = await API.post("/quiz/submit", answers);
  return response.data;
};