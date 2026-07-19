const db = require("../config/db");

// Get student by ID
exports.getStudentById = async (id) => {

    const [rows] = await db.query(
        `
        SELECT id, password
        FROM students
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
};

// Update password
exports.updatePassword = async (
    id,
    hashedPassword
) => {

    const [result] = await db.query(
        `
        UPDATE students
        SET password = ?
        WHERE id = ?
        `,
        [
            hashedPassword,
            id
        ]
    );

    return result;
};