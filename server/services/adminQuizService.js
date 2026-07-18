const adminQuizModel = require("../models/adminQuizModel");

// ==========================
// Get All Quizzes
// ==========================
exports.getAllQuizzes = async () => {

    const quizzes =
        await adminQuizModel.getAllQuizzes();

    return {
        status: 200,
        quizzes
    };

};

// ==========================
// Get Quiz Details
// ==========================
exports.getQuizDetails = async (quizId) => {

    const questions =
        await adminQuizModel.getQuizDetails(quizId);

    return {
        status: 200,
        questions
    };

};

// ==========================
// Get Students Attempted Quiz
// ==========================
exports.getQuizStudents = async (quizId) => {

    const students =
        await adminQuizModel.getQuizStudents(quizId);

    return {
        status: 200,
        students
    };

};
// ==========================
// Delete Quiz
// ==========================
exports.deleteQuiz = async (quizId) => {

    const result =
        await adminQuizModel.deleteQuiz(quizId);

    if (result.affectedRows === 0) {

        return {
            status: 404,
            message: "Quiz not found"
        };

    }

    return {
        status: 200,
        message: "Quiz deleted successfully"
    };

};