const express = require("express");

const router = express.Router();

const dailyQuizController = require("../controllers/dailyQuizController");

// Generate Today's Quiz
router.post(
    "/generate",
    dailyQuizController.generateTodayQuiz
);

module.exports = router;