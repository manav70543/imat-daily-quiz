const dailyQuizService = require("../services/dailyQuizService");

exports.generateTodayQuiz = async (req, res) => {

    try {

        const result = await dailyQuizService.generateTodayQuiz();

        res.status(200).json({
            success: true,
            alreadyExists: result.alreadyExists,
            totalQuestions: result.questions.length,
            questions: result.questions
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};