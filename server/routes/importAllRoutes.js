const express = require("express");
const router = express.Router();

const importController = require("../controllers/importController");

router.post("/import-all", importController.importAllQuestions);

module.exports = router;