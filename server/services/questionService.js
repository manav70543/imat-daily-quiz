const questionModel = require("../models/questionModel");

// =======================
// Get All Questions
// =======================
exports.getAllQuestions = async () => {

    const questions = await questionModel.findAllQuestions();

    return {
        status: 200,
        questions
    };

};

// =======================
// Add Question
// =======================
exports.addQuestion = async (data) => {

    const {
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        subject,
        difficulty
    } = data;

    await questionModel.createQuestion(
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        subject,
        difficulty
    );

    return {
        status: 201,
        message: "Question added successfully"
    };

};

// =======================
// Get Question By ID
// =======================
exports.getQuestionById = async (id) => {

    const question = await questionModel.findQuestionById(id);

    if (!question.length) {
        return {
            status: 404,
            message: "Question not found"
        };
    }

    return {
        status: 200,
        question: question[0]
    };

};

// =======================
// Update Question
// =======================
exports.updateQuestion = async (id, data) => {

    const {
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        subject,
        difficulty
    } = data;

    await questionModel.updateQuestion(
        id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        subject,
        difficulty
    );

    return {
        status: 200,
        message: "Question updated successfully"
    };

};

// =======================
// Delete Question
// =======================
exports.deleteQuestion = async (id) => {

    await questionModel.deleteQuestion(id);

    return {
        status: 200,
        message: "Question deleted successfully"
    };

};