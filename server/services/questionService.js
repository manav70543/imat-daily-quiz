const questionModel = require("../models/questionModel");

exports.getAllQuestions = async () => {
    const questions = await questionModel.findAllQuestions();

    return {
        status: 200,
        questions
    };
};

exports.addQuestion = async (questionData) => {

    await questionModel.createQuestion(
        questionData.question,
        questionData.option_a,
        questionData.option_b,
        questionData.option_c,
        questionData.option_d,
        questionData.correct_option,
        questionData.subject,
        questionData.difficulty
    );

    return {
        status: 201,
        message: "Question added successfully"
    };
};