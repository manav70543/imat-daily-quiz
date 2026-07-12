const quizModel = require("../models/quizModel");

// Get today's quiz
exports.getTodayQuiz = async () => {
    const today = new Date().toISOString().split("T")[0];

    // Check if today's quiz already exists
    const existingQuiz = await quizModel.findTodayQuiz(today);

    if (existingQuiz.length > 0) {
        const questions = await quizModel.getQuizQuestions(existingQuiz[0].id);

        return {
            status: 200,
            quiz: {
                ...existingQuiz[0],
                questions,
            },
        };
    }

    // Create today's quiz
    const quizId = await quizModel.createTodayQuiz(today);

    // Get 10 random questions
    const randomQuestions = await quizModel.getRandomQuestions();

    // Save them
    for (const question of randomQuestions) {
        await quizModel.addQuestionToQuiz(
            quizId,
            question.id
        );
    }

    // Fetch complete quiz
    const questions = await quizModel.getQuizQuestions(quizId);

    return {
        status: 201,
        quiz: {
            id: quizId,
            quiz_date: today,
            questions,
        },
    };
};

// Submit quiz
exports.submitQuiz = async (studentId, quizId, answers) => {

    // Check duplicate submission
    const alreadySubmitted = await quizModel.hasSubmittedQuiz(
        studentId,
        quizId
    );

    if (alreadySubmitted) {
        return {
            status: 400,
            message: "You have already submitted this quiz."
        };
    }

    // Get correct answers
    const correctAnswers = await quizModel.getCorrectAnswers(quizId);

    let score = 0;

    // Calculate score
    for (const answer of answers) {

        const correct = correctAnswers.find(
            q => q.id === answer.question_id
        );

        if (
            correct &&
            correct.correct_option === answer.selected_option
        ) {
            score++;
        }
    }

    // Save result
    await quizModel.saveQuizResult(
        studentId,
        quizId,
        score,
        correctAnswers.length
    );

    return {
        status: 200,
        score,
        total: correctAnswers.length,
        percentage: (score / correctAnswers.length) * 100
    };
};

// Get student's quiz history
exports.getQuizHistory = async (studentId) => {
    const history = await quizModel.getQuizHistory(studentId);

    const formattedHistory = history.map(item => ({
        quiz_date: item.quiz_date,
        score: item.score,
        total: item.total_questions,
        percentage: Number(
            ((item.score / item.total_questions) * 100).toFixed(2)
        )
    }));

    return {
        status: 200,
        history: formattedHistory
    };
};
// Get leaderboard
exports.getLeaderboard = async () => {

    const leaderboard = await quizModel.getLeaderboard();

    return {
        status: 200,
        leaderboard
    };

};
// Get admin dashboard
exports.getDashboardStats = async () => {

    const stats = await quizModel.getDashboardStats();

    return {
        status: 200,
        dashboard: stats
    };

};