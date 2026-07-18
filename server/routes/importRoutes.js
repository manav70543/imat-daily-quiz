const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const importController = require("../controllers/importController");

router.post(
    "/questions",
    upload.single("file"),
    importController.importQuestions
);

module.exports = router;