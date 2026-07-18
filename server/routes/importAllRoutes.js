const express = require("express");
const router = express.Router();

const importController = require("../controllers/importController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Protect all import routes
router.use(authMiddleware);
router.use(adminMiddleware);

// ==========================
// Import All Questions
// ==========================
router.post(
    "/import-all",
    importController.importAllQuestions
);

module.exports = router;