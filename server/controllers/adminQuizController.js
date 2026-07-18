const adminQuizService = require("../services/adminQuizService");

// ==========================
// Get All Quizzes
// ==========================
exports.getAllQuizzes = async (req, res) => {

    try {

        const result =
            await adminQuizService.getAllQuizzes();

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Get Quiz Details
// ==========================
exports.getQuizDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
            await adminQuizService.getQuizDetails(id);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ==========================
// Get Students Attempted Quiz
// ==========================
exports.getQuizStudents = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
            await adminQuizService.getQuizStudents(id);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ==========================
// Delete Quiz
// ==========================
exports.deleteQuiz = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
            await adminQuizService.deleteQuiz(id);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};