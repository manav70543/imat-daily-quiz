const bcrypt = require("bcrypt");
const passwordModel = require("../models/passwordModel");

exports.changePassword = async (
    studentId,
    oldPassword,
    newPassword,
    confirmPassword
) => {

    const student =
        await passwordModel.getStudentById(studentId);

    if (!student) {

        return {
            status: 404,
            message: "Student not found"
        };

    }

    const validPassword =
        await bcrypt.compare(
            oldPassword,
            student.password
        );

    if (!validPassword) {

        return {
            status: 400,
            message: "Current password is incorrect"
        };

    }

    if (newPassword !== confirmPassword) {

        return {
            status: 400,
            message: "Passwords do not match"
        };

    }

    if (newPassword.length < 6) {

        return {
            status: 400,
            message: "Password must be at least 6 characters"
        };

    }

    const samePassword =
        await bcrypt.compare(
            newPassword,
            student.password
        );

    if (samePassword) {

        return {
            status: 400,
            message: "New password must be different"
        };

    }

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );

    await passwordModel.updatePassword(
        studentId,
        hashedPassword
    );

    return {

        status: 200,
        message: "Password changed successfully"

    };

};