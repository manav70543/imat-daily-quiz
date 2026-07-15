const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

console.log("Auth Middleware:", authMiddleware);
console.log("Quiz Controller:", quizController);

// Today's Quiz
router.get("/today", authMiddleware, quizController.getTodayQuiz);

// Submit Quiz
router.post("/submit", authMiddleware, quizController.submitQuiz);

// Quiz History
router.get("/history/:studentId", authMiddleware, quizController.getQuizHistory);

// Leaderboard
router.get("/leaderboard", quizController.getLeaderboard);




// Student Dashboard
router.get(
    "/student/dashboard",
    authMiddleware,
    quizController.getStudentDashboard
);

// Weekly Performance
router.get(
    "/student/weekly-performance",
    authMiddleware,
    quizController.getWeeklyPerformance
);

// Subject Performance
router.get(
    "/student/subjects",
    authMiddleware,
    quizController.getSubjectPerformance
);
// Current Streak
router.get(
    "/student/streak",
    authMiddleware,
    quizController.getCurrentStreak
);
router.get(
    "/student/achievements",
    authMiddleware,
    quizController.getAchievements
);
// XP & Level
router.get(
    "/student/xp",
    authMiddleware,
    quizController.getStudentXP
);
router.get(
    "/student/profile",
    authMiddleware,
    quizController.getStudentProfile
);
// Admin Dashboard
router.get("/dashboard", quizController.getDashboardStats);

console.log("Quiz routes loaded");
console.log(router.stack.map(r => r.route?.path));

module.exports = router;