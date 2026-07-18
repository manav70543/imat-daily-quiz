const express = require("express");
const router = express.Router();

const adminQuizController = require("../controllers/adminQuizController");

// ==========================
// Get All Daily Quizzes
// ==========================
router.get(
    "/quizzes",
    adminQuizController.getAllQuizzes
);

// ==========================
// Get Quiz Details
// ==========================
router.get(
    "/quizzes/:id",
    adminQuizController.getQuizDetails
);
router.get(
    "/quizzes/:id/students",
    adminQuizController.getQuizStudents
);
router.delete(
    "/quizzes/:id",
    adminQuizController.deleteQuiz
);

module.exports = router;