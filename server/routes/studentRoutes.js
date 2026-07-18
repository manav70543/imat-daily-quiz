const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validation");

const {
    registerValidation,
    loginValidation
} = require("../validators/authValidator");


// Register
router.post(
    "/register",
    registerValidation,
    validate,
    studentController.registerStudent
);

// Login
router.post(
    "/login",
    loginValidation,
    validate,
    studentController.loginStudent
);

// Profile
router.get(
    "/profile",
    authMiddleware,
    studentController.getProfile
);

module.exports = router;