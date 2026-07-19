const express = require("express");

const router = express.Router();

const passwordResetController = require("../controllers/passwordResetController");

// ======================================
// Send Reset Email
// ======================================
router.post(
    "/forgot-password",
    passwordResetController.sendResetEmail
);

// ======================================
// Reset Password
// ======================================
router.post(
    "/reset-password/:token",
    passwordResetController.resetPassword
);

module.exports = router;