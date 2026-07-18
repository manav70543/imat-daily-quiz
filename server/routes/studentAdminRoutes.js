const express = require("express");
const router = express.Router();

const studentAdminController = require("../controllers/studentAdminController");

// Search
router.get(
    "/students/search",
    studentAdminController.searchStudents
);

// Student Details (NEW)
router.get(
    "/students/:id/details",
    studentAdminController.getStudentDetails
);
router.get(
    "/students/:studentId/attempt/:quizId",
    studentAdminController.getStudentAttempt
);

// Get Single Student
router.get(
    "/students/:id",
    studentAdminController.getStudentById
);

// Get All Students
router.get(
    "/students",
    studentAdminController.getAllStudents
);

module.exports = router;