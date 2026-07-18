const express = require("express");
const router = express.Router();

const dailyQuizController = require("../controllers/dailyQuizController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Protect all daily quiz routes
router.use(authMiddleware);
router.use(adminMiddleware);

// ==========================
// Generate Today's Quiz
// ==========================
router.post(
    "/generate",
    dailyQuizController.generateTodayQuiz
);

module.exports = router;