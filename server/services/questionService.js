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

exports.getQuestionById = async (id) => {

    const questions = await questionModel.findQuestionById(id);

    if (questions.length === 0) {
        return {
            status: 404,
            message: "Question not found"
        };
    }

    return {
        status: 200,
        question: questions[0]
    };

};
exports.updateQuestion = async (id, questionData) => {

    const questions = await questionModel.findQuestionById(id);

    if (questions.length === 0) {
        return {
            status: 404,
            message: "Question not found"
        };
    }

    await questionModel.updateQuestion(
        id,
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
        status: 200,
        message: "Question updated successfully"
    };

};

exports.deleteQuestion = async (id) => {

    const questions = await questionModel.findQuestionById(id);

    if (questions.length === 0) {
        return {
            status: 404,
            message: "Question not found"
        };
    }

    await questionModel.deleteQuestion(id);

    return {
        status: 200,
        message: "Question deleted successfully"
    };
};