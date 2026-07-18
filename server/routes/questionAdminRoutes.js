const express = require("express");
const router = express.Router();

const questionAdminController = require("../controllers/questionAdminController");

// Get all questions
router.get(
    "/questions",
    questionAdminController.getAllQuestions
);
router.get(
    "/questions/search",
    questionAdminController.searchQuestions
);
router.get(
    "/questions/filter/subject",
    questionAdminController.filterBySubject
);
router.post(
    "/questions",
    questionAdminController.addQuestion
);
router.put(
    "/questions/:id",
    questionAdminController.updateQuestion
);
router.delete(
    "/questions/:id",
    questionAdminController.deleteQuestion
);
module.exports = router;