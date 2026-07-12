const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

// Today's Quiz
router.get("/today", authMiddleware, quizController.getTodayQuiz);

// Submit Quiz
router.post("/submit", authMiddleware, quizController.submitQuiz);

// Quiz History
router.get("/history/:studentId", authMiddleware, quizController.getQuizHistory);

// Leaderboard
router.get("/leaderboard", quizController.getLeaderboard);

// Dashboard
router.get("/dashboard", quizController.getDashboardStats);

module.exports = router;