const express = require("express");
const router = express.Router();

const studentAdminController = require("../controllers/studentAdminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Protect all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// ===============================
// Get All Students
// ===============================
router.get(
    "/students",
    studentAdminController.getAllStudents
);

// ===============================
// Search Students
// ===============================
router.get(
    "/students/search",
    studentAdminController.searchStudents
);

// ===============================
// Get Student Details
// ===============================
router.get(
    "/students/:id",
    studentAdminController.getStudentDetails
);

// ===============================
// Student Attempt
// ===============================
router.get(
    "/students/:studentId/attempt/:quizId",
    studentAdminController.getStudentAttempt
);

// ===============================
// Delete Student
// ===============================
router.delete(
    "/students/:id",
    studentAdminController.deleteStudent
);

module.exports = router;