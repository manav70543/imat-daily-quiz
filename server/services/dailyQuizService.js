const dailyQuizModel = require("../models/dailyQuizModel");

exports.generateTodayQuiz = async () => {

    const today = new Date().toISOString().split("T")[0];

    // Check if today's quiz already exists
    const existingQuiz = await dailyQuizModel.getTodayQuiz(today);

    if (existingQuiz.length > 0) {

        const questions = await dailyQuizModel.getQuizQuestions(existingQuiz[0].id);

        return {
            alreadyExists: true,
            questions
        };

    }

    // Create today's quiz
    const quizId = await dailyQuizModel.createQuiz(today);

    const subjects = [
        "Biology",
        "Chemistry",
        "Physics",
        "Mathematics",
        "Logical Reasoning"
    ];

    for (const subject of subjects) {

        const questions =
            await dailyQuizModel.getRandomQuestions(subject, 10);

        for (const question of questions) {

            await dailyQuizModel.saveQuizQuestion(
                quizId,
                question.id
            );

        }

    }

    const quizQuestions =
        await dailyQuizModel.getQuizQuestions(quizId);

    return {
        alreadyExists: false,
        questions: quizQuestions
    };

};