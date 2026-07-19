const studentService = require("../services/studentService");

// ===========================
// Register Student
// ===========================
exports.registerStudent = async (req, res) => {

    const result = await studentService.register(req.body);

    res.status(result.status).json({
        message: result.message
    });

};

// ===========================
// Login Student
// ===========================
exports.loginStudent = async (req, res) => {

    const result = await studentService.login(req.body);

    res.status(result.status).json(result);

};

// ===========================
// Get Profile
// ===========================
exports.getProfile = async (req, res) => {

    const result =
        await studentService.getProfile(req.user.id);

    res.status(result.status).json(result);

};

// ===========================
// Student Details
// ===========================
exports.getStudentDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
            await studentService.getStudentDetails(id);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};