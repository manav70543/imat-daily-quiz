const express = require("express");
const router = express.Router();

const adminQuizController = require("../controllers/adminQuizController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Protect all admin quiz routes
router.use(authMiddleware);
router.use(adminMiddleware);

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

// ==========================
// Get Quiz Students
// ==========================
router.get(
    "/quizzes/:id/students",
    adminQuizController.getQuizStudents
);

// ==========================
// Delete Quiz
// ==========================
router.delete(
    "/quizzes/:id",
    adminQuizController.deleteQuiz
);

module.exports = router;