const express = require("express");
const router = express.Router();

const quizController = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

// ==========================
// Today's Quiz
// ==========================
router.get(
    "/today",
    authMiddleware,
    quizController.getTodayQuiz
);

// ==========================
// Submit Quiz
// ==========================
router.post(
    "/submit",
    authMiddleware,
    quizController.submitQuiz
);

// ==========================
// Student Quiz History
// ==========================
router.get(
    "/student/history",
    authMiddleware,
    quizController.getStudentHistory
);

// ==========================
// Leaderboard
// ==========================
router.get(
    "/leaderboard",
    authMiddleware,
    quizController.getLeaderboard
);

// ==========================
// Student Dashboard
// ==========================
router.get(
    "/student/dashboard",
    authMiddleware,
    quizController.getStudentDashboard
);

// ==========================
// Weekly Performance
// ==========================
router.get(
    "/student/weekly-performance",
    authMiddleware,
    quizController.getWeeklyPerformance
);

// ==========================
// Subject Performance
// ==========================
router.get(
    "/student/subjects",
    authMiddleware,
    quizController.getSubjectPerformance
);

// ==========================
// Current Streak
// ==========================
router.get(
    "/student/streak",
    authMiddleware,
    quizController.getCurrentStreak
);

// ==========================
// Achievements
// ==========================
router.get(
    "/student/achievements",
    authMiddleware,
    quizController.getAchievements
);

// ==========================
// XP
// ==========================
router.get(
    "/student/xp",
    authMiddleware,
    quizController.getStudentXP
);

// ==========================
// Student Profile
// ==========================
router.get(
    "/student/profile",
    authMiddleware,
    quizController.getStudentProfile
);

// ==========================
// Admin Dashboard
// ==========================
router.get(
    "/dashboard",
    quizController.getDashboardStats
);


module.exports = router;