const studentAdminModel = require("../models/studentAdminModel");

// ==========================
// Get All Students (Pagination)
// ==========================
exports.getAllStudents = async (page, limit) => {

    const offset = (page - 1) * limit;

    const students = await studentAdminModel.getAllStudents(
        limit,
        offset
    );

    const totalStudents =
        await studentAdminModel.getTotalStudents();

    return {
        status: 200,

        students,

        pagination: {
            currentPage: page,
            limit: limit,
            totalStudents: totalStudents,
            totalPages: Math.ceil(totalStudents / limit)
        }
    };

};

// ==========================
// Search Students
// ==========================
exports.searchStudents = async (keyword) => {

    const students =
        await studentAdminModel.searchStudents(keyword);

    return {
        status: 200,
        students
    };

};

// ==========================
// Get Student By ID
// ==========================
exports.getStudentById = async (id) => {

    const student =
        await studentAdminModel.getStudentById(id);

    return {
        status: 200,
        student
    };

};

// ==========================
// Get Full Student Details
// ==========================
exports.getStudentDetails = async (id) => {

    const result =
        await studentAdminModel.getStudentDetails(id);

    if (!result) {

        return {
            status: 404,
            message: "Student not found"
        };

    }

    return {
        status: 200,
        ...result
    };

};

// ==========================
// Student Attempt Details
// ==========================
exports.getStudentAttempt = async (studentId, quizId) => {

    const attempts =
        await studentAdminModel.getStudentAttempt(
            studentId,
            quizId
        );

    return {
        status: 200,
        attempts
    };

};

exports.deleteStudent = async (id) => {

    await studentAdminModel.deleteStudent(id);

    return {
        status: 200,
        message: "Student deleted successfully"
    };

};