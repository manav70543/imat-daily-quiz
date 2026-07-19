const db = require("../config/db");

// Find student by email
exports.findStudentByEmail = async (email) => {

    const [rows] = await db.query(
        `
        SELECT id, email
        FROM students
        WHERE email = ?
        `,
        [email]
    );

    return rows[0];
};

// Save reset token
exports.saveResetToken = async (
    studentId,
    token,
    expiresAt
) => {

    await db.query(
        `
        INSERT INTO password_reset_tokens
        (
            student_id,
            token,
            expires_at
        )
        VALUES (?, ?, ?)
        `,
        [
            studentId,
            token,
            expiresAt
        ]
    );

};

// Find token
exports.findToken = async (token) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM password_reset_tokens
        WHERE token = ?
        `,
        [token]
    );

    return rows[0];

};

// Update student's password
exports.updatePassword = async (
    studentId,
    hashedPassword
) => {

    await db.query(
        `
        UPDATE students
        SET password = ?
        WHERE id = ?
        `,
        [
            hashedPassword,
            studentId
        ]
    );

};

// Delete token after use
exports.deleteToken = async (token) => {

    await db.query(
        `
        DELETE FROM password_reset_tokens
        WHERE token = ?
        `,
        [token]
    );

};
exports.deleteExistingTokens = async (studentId) => {

    await db.query(
        `
        DELETE
        FROM password_reset_tokens
        WHERE student_id = ?
        `,
        [studentId]
    );

};