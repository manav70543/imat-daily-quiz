const crypto = require("crypto");
const bcrypt = require("bcrypt");

const passwordResetModel = require("../models/passwordResetModel");
const sendMail = require("../utils/mailer");

// =====================================
// Send Reset Email
// =====================================
exports.sendResetEmail = async (email) => {

    const student =
        await passwordResetModel.findStudentByEmail(email);

    // Never reveal whether the email exists
    if (!student) {

        return {
            status: 200,
            message:
                "If an account exists, a password reset link has been sent."
        };

    }

    // Delete previous reset links
    await passwordResetModel.deleteExistingTokens(
        student.id
    );

    const token =
        crypto.randomBytes(32).toString("hex");

    const expiresAt =
        new Date(Date.now() + 15 * 60 * 1000);

    await passwordResetModel.saveResetToken(
        student.id,
        token,
        expiresAt
    );

    const resetLink =
        `${process.env.CLIENT_URL}/reset-password/${token}`;

    console.log("Student Email:", student.email);
    console.log("Reset Link:", resetLink);

    await sendMail(
        student.email,
        "Reset Your IMAT Daily Quiz Password",
        `
        <h2>Password Reset</h2>

        <p>
            Click the button below to reset your password.
        </p>

        <a
            href="${resetLink}"
            style="
                background:#2563eb;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
            "
        >
            Reset Password
        </a>

        <p>
            This link expires in <b>15 minutes</b>.
        </p>
        `
    );

    return {
        status: 200,
        message:
            "If an account exists, a password reset link has been sent."
    };

};

// =====================================
// Reset Password
// =====================================
exports.resetPassword = async (
    token,
    password
) => {

    const resetToken =
        await passwordResetModel.findToken(token);

    if (!resetToken) {

        return {
            status: 400,
            message: "Invalid reset link"
        };

    }

    if (
        new Date(resetToken.expires_at) <
        new Date()
    ) {

        return {
            status: 400,
            message: "Reset link has expired"
        };

    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    await passwordResetModel.updatePassword(
        resetToken.student_id,
        hashedPassword
    );

    await passwordResetModel.deleteToken(token);

    return {
        status: 200,
        message: "Password reset successfully"
    };

};