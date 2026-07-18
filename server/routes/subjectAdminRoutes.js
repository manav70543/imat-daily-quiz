const express = require("express");

const router = express.Router();

const subjectAdminController =
require("../controllers/subjectAdminController");

router.get(
    "/subjects",
    subjectAdminController.getAllSubjects
);

module.exports = router;