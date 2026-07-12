const quizService = require("../services/quizService");

exports.getTodayQuiz = async (req, res) => {
    try {
        const result = await quizService.getTodayQuiz();
        res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

exports.submitQuiz = async (req, res) => {
    try {
        const { student_id, quiz_id, answers } = req.body;

        const result = await quizService.submitQuiz(
            student_id,
            quiz_id,
            answers
        );

        res.status(result.status).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Get student's quiz history
exports.getQuizHistory = async (req, res) => {
    try {
        const { studentId } = req.params;

        const result = await quizService.getQuizHistory(studentId);

        res.status(result.status).json(result);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
// Get leaderboard
exports.getLeaderboard = async (req, res) => {
    try {

        const result = await quizService.getLeaderboard();

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
// Get admin dashboard
exports.getDashboardStats = async (req, res) => {
    try {

        const result = await quizService.getDashboardStats();

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};