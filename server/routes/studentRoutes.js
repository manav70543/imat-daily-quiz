const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", studentController.registerStudent);

router.post("/login", studentController.loginStudent);

router.get("/profile", authMiddleware, studentController.getProfile);

module.exports = router;