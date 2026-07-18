const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post(
    "/login",
    adminController.login
);

router.get(
    "/dashboard",
    adminController.getDashboardStats
);
router.get(
    "/recent-students",
    adminController.getRecentStudents
);

module.exports = router;