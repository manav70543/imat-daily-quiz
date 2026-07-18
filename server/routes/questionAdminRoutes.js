const express = require("express");
const router = express.Router();

const questionAdminController = require("../controllers/questionAdminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Protect all routes in this router
router.use(authMiddleware);
router.use(adminMiddleware);

// ============================
// Questions
// ============================

// Get all questions
router.get(
    "/questions",
    questionAdminController.getAllQuestions
);

// Search questions
router.get(
    "/questions/search",
    questionAdminController.searchQuestions
);

// Filter by subject
router.get(
    "/questions/filter/subject",
    questionAdminController.filterBySubject
);

// Add question
router.post(
    "/questions",
    questionAdminController.addQuestion
);

// Update question
router.put(
    "/questions/:id",
    questionAdminController.updateQuestion
);

// Delete question
router.delete(
    "/questions/:id",
    questionAdminController.deleteQuestion
);

module.exports = router;