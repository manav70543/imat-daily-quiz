const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const passwordController =
    require("../controllers/passwordController");

router.put(
    "/change-password",
    authMiddleware,
    passwordController.changePassword
);

module.exports = router;