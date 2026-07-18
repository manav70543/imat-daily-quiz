const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const apiLimiter = require("../middleware/rateLimiter");

// Login
router.post(
    "/login",
    apiLimiter,
    adminController.login
);

// Dashboard
router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    adminController.getDashboardStats
);

// Recent Students
router.get(
    "/recent-students",
    authMiddleware,
    adminMiddleware,
    adminController.getRecentStudents
);

module.exports = router;