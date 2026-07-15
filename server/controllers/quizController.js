const quizService = require("../services/quizService");
console.log("quizService =", quizService);

// ==========================
// Get Today's Quiz
// ==========================
exports.getTodayQuiz = async (req, res) => {
    try {

        // Student ID comes from JWT token
        const studentId = req.student.id;

        const result = await quizService.getTodayQuiz(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// ==========================
// Submit Quiz
// ==========================
exports.submitQuiz = async (req, res) => {
    try {

        const studentId = req.student.id;

        const { quiz_id, answers } = req.body;

        const result = await quizService.submitQuiz(
            studentId,
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

// ==========================
// Quiz History
// ==========================
exports.getQuizHistory = async (req, res) => {
    try {

        const studentId = req.student.id;

        const result = await quizService.getQuizHistory(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};

// ==========================
// Leaderboard
// ==========================
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

// ==========================
// Admin Dashboard
// ==========================
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

// ==========================
// Student Dashboard
// ==========================
exports.getStudentDashboard = async (req, res) => {

    try {

        const studentId = req.student.id;

        const result = await quizService.getStudentDashboard(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

exports.getWeeklyPerformance = async (req, res) => {

    try {

        const studentId = req.student.id;

        const result = await quizService.getWeeklyPerformance(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

exports.getSubjectPerformance = async (req, res) => {

    try {

        const studentId = req.student.id;

        const result =
            await quizService.getSubjectPerformance(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
exports.getSubjectPerformance = async (req, res) => {

    try {

        const studentId = req.student.id;

        const result =
            await quizService.getSubjectPerformance(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

exports.getCurrentStreak = async (req, res) => {

    try {

        const studentId = req.student.id;

        const result =
            await quizService.getCurrentStreak(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
exports.getAchievements = async (req, res) => {

    try {

        const achievements = [
            {
                title: "First Quiz",
                icon: "🎯",
                unlocked: true
            },
            {
                title: "3 Day Streak",
                icon: "🔥",
                unlocked: false
            },
            {
                title: "10 Quizzes",
                icon: "🏅",
                unlocked: false
            },
            {
                title: "90% Average",
                icon: "⭐",
                unlocked: false
            }
        ];

        res.json({
            status: 200,
            achievements
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

exports.getStudentXP = async (req, res) => {
  try {
    const studentId = req.student.id;

    const result = await quizService.getStudentXP(studentId);

    res.status(result.status).json(result);

  } catch (error) {
    console.error("XP ERROR:", error);

    res.status(500).json({
        message: error.message
    });
}
};

exports.getStudentProfile = async (req, res) => {

    try {

        const studentId = req.student.id;

        const result =
            await quizService.getStudentProfile(studentId);

        res.status(result.status).json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};