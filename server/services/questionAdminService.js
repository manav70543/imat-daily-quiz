const questionAdminModel = require("../models/questionAdminModel");

// ==========================
// Get All Questions (Pagination)
// ==========================
exports.getAllQuestions = async (page, limit) => {

    const offset = (page - 1) * limit;

    const questions =
        await questionAdminModel.getAllQuestions(
            limit,
            offset
        );

    const totalQuestions =
        await questionAdminModel.getTotalQuestions();

    return {
        status: 200,

        questions,

        pagination: {
            currentPage: page,
            limit: limit,
            totalQuestions: totalQuestions,
            totalPages: Math.ceil(
                totalQuestions / limit
            )
        }
    };

};

// ==========================
// Search Questions
// ==========================
exports.searchQuestions = async (keyword) => {

    const questions =
        await questionAdminModel.searchQuestions(keyword);

    return {
        status: 200,
        questions
    };

};

// ==========================
// Filter By Subject
// ==========================
exports.filterBySubject = async (subject) => {

    const questions =
        await questionAdminModel.filterBySubject(subject);

    return {
        status: 200,
        questions
    };

};

// ==========================
// Add Question
// ==========================
exports.addQuestion = async (
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    subject,
    difficulty
) => {

    await questionAdminModel.addQuestion(
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

// ==========================
// Update Question
// ==========================
exports.updateQuestion = async (
    id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    subject,
    difficulty
) => {

    await questionAdminModel.updateQuestion(
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

// ==========================
// Delete Question
// ==========================
exports.deleteQuestion = async (id) => {

    await questionAdminModel.deleteQuestion(id);

    return {
        status: 200,
        message: "Question deleted successfully"
    };

};