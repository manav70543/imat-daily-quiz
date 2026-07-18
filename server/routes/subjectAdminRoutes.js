const express = require("express");
const router = express.Router();

const subjectAdminController =
    require("../controllers/subjectAdminController");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

router.use((req, res, next) => {
    console.log("===== SUBJECT ROUTE =====");
    console.log(req.method, req.originalUrl);
    next();
});

router.use(authMiddleware);
router.use(adminMiddleware);

router.get(
    "/subjects",
    subjectAdminController.getAllSubjects
);

module.exports = router;