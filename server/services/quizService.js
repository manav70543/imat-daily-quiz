const quizModel = require("../models/quizModel");

// ==========================
// Get Today's Quiz
// ==========================
exports.getTodayQuiz = async (studentId) => {

    const today = new Date().toISOString().split("T")[0];

    const existingQuiz = await quizModel.findTodayQuiz(today);

    // Today's quiz already exists
    if (existingQuiz.length > 0) {

        const quizId = existingQuiz[0].id;

        // Check if student has already submitted
        const alreadySubmitted = await quizModel.hasSubmittedQuiz(
            studentId,
            quizId
        );

        if (alreadySubmitted) {

            const result = await quizModel.getStudentQuizResult(
                studentId,
                quizId
            );

            const studentAnswers = await quizModel.getStudentAnswers(
                studentId,
                quizId
            );

            const review = await quizModel.getQuizReview(quizId);

            const score = result[0].score;
            const total = result[0].total_questions;

            const reviewData = review.map(question => {

                const answer = studentAnswers.find(
                    a => Number(a.question_id) === Number(question.id)
                );

                const yourAnswer = answer
                    ? answer.selected_option
                    : "Not Answered";

                return {
                    questionId: question.id,
                    question: question.question,

                    option_a: question.option_a,
                    option_b: question.option_b,
                    option_c: question.option_c,
                    option_d: question.option_d,

                    yourAnswer,
                    correctAnswer: question.correct_option,

                    correct:
                        yourAnswer === question.correct_option
                };
            });

            return {
                status: 200,
                alreadySubmitted: true,
                result: {
                    score,
                    total,
                    percentage: Number(
                        ((score / total) * 100).toFixed(2)
                    ),
                    review: reviewData
                }
            };
        }

        // Student has not submitted
        const questions = await quizModel.getQuizQuestions(quizId);

        return {
            status: 200,
            quiz: {
                ...existingQuiz[0],
                questions
            }
        };
    }

    // No quiz exists today -> create one
    const quizId = await quizModel.createTodayQuiz(today);

    const randomQuestions = await quizModel.getRandomQuestions();

    for (const question of randomQuestions) {
        await quizModel.addQuestionToQuiz(
            quizId,
            question.id
        );
    }

    const questions = await quizModel.getQuizQuestions(quizId);

    return {
        status: 201,
        quiz: {
            id: quizId,
            quiz_date: today,
            questions
        }
    };
};

// ==========================
// Submit Quiz
// ==========================
exports.submitQuiz = async (studentId, quizId, answers) => {

    // Prevent duplicate submission
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
            q => Number(q.id) === Number(answer.question_id)
        );

        if (!correct) continue;

        const selectedOption = String(answer.selected_option)
            .trim()
            .toUpperCase();

        const correctOption = String(correct.correct_option)
            .trim()
            .toUpperCase();

        // Save student's answer
        await quizModel.saveStudentAnswer(
            studentId,
            quizId,
            answer.question_id,
            selectedOption
        );

        if (selectedOption === correctOption) {
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

    // Get complete quiz review
    const review = await quizModel.getQuizReview(quizId);

    const reviewData = review.map(question => {

        const studentAnswer = answers.find(
            a => Number(a.question_id) === Number(question.id)
        );

        const yourAnswer = studentAnswer
            ? studentAnswer.selected_option
            : "Not Answered";

        return {
            questionId: question.id,
            question: question.question,

            option_a: question.option_a,
            option_b: question.option_b,
            option_c: question.option_c,
            option_d: question.option_d,

            yourAnswer,
            correctAnswer: question.correct_option,

            correct:
                yourAnswer === question.correct_option
        };
    });

    return {
        status: 200,
        score,
        total: correctAnswers.length,
        percentage: Number(
            ((score / correctAnswers.length) * 100).toFixed(2)
        ),
        review: reviewData
    };
};

// ==========================
// Quiz History
// ==========================
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

// ==========================
// Leaderboard
// ==========================
exports.getLeaderboard = async () => {

    const leaderboard = await quizModel.getLeaderboard();

    return {
        status: 200,
        leaderboard
    };
};

// ==========================
// Admin Dashboard
// ==========================
exports.getDashboardStats = async () => {

    const stats = await quizModel.getDashboardStats();

    return {
        status: 200,
        dashboard: stats
    };
};

// ==========================
// Student Dashboard
// ==========================
exports.getStudentDashboard = async (studentId) => {

    const dashboard = await quizModel.getStudentDashboard(studentId);

    return {
        status: 200,
        dashboard
    };

};

exports.getWeeklyPerformance = async (studentId) => {

    const weekly = await quizModel.getWeeklyPerformance(studentId);

    return {
        status: 200,
        weekly
    };

};

exports.getSubjectPerformance = async (studentId) => {

    const subjects =
        await quizModel.getSubjectPerformance(studentId);

    return {
        status: 200,
        subjects
    };

};
exports.getCurrentStreak = async (studentId) => {

    const streak =
        await quizModel.getCurrentStreak(studentId);

    return {
        status: 200,
        streak
    };

};
exports.getAchievements = async (studentId) => {

    const achievements =
        await quizModel.getAchievements(studentId);

    return {
        status: 200,
        achievements
    };

};
exports.getStudentXP = async (studentId) => {

    const rows = await quizModel.getStudentXP(studentId);

    let xp = 0;

    rows.forEach((quiz) => {
        xp += Number(quiz.score);
    });

    const level = Math.floor(xp / 100) + 1;

    return {
        status: 200,
        xp,
        level,
        progress: xp % 100,
        nextLevelXP: level * 100
    };
};

exports.getStudentProfile = async (studentId) => {

    const profile =
        await quizModel.getStudentProfile(studentId);

    return {
        status: 200,
        profile
    };

};