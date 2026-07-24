const db = require("../config/db");

// ===========================
// Find Student By Email
// ===========================
exports.findStudentByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM students WHERE email = ?",
        [email]
    );

    return rows;
};

// ===========================
// Create Student
// ===========================
exports.createStudent = async (
    full_name,
    email,
    password
) => {
    const [result] = await db.query(
        `
        INSERT INTO students
        (
            full_name,
            email,
            password
        )
        VALUES (?, ?, ?)
        `,
        [
            full_name,
            email,
            password
        ]
    );

    return result;
};

// ===========================
// Find Student By ID
// ===========================
exports.findStudentById = async (id) => {
    const [rows] = await db.query(
        `
        SELECT
            id,
            full_name,
            email,
            created_at
        FROM students
        WHERE id = ?
        `,
        [id]
    );

    return rows;
};

// ===========================
// Get Student Details
// ===========================
exports.getStudentDetails = async (id) => {
    const [studentRows] = await db.query(
        `
        SELECT
            id,
            full_name,
            email,
            xp,
            level,
            created_at
        FROM students
        WHERE id = ?
        `,
        [id]
    );

    if (studentRows.length === 0) {
        return null;
    }

    const [[stats]] = await db.query(
        `
        SELECT
            COUNT(*) AS totalAttempts,
            ROUND(AVG(score), 2) AS averageScore,
            MAX(score) AS highestScore,
            MIN(score) AS lowestScore
        FROM quiz_results
        WHERE student_id = ?
        `,
        [id]
    );

    const [history] = await db.query(
        `
        SELECT
            dq.quiz_date,
            qr.score,
            qr.total_questions,

            ROUND(
                (qr.score * 100.0) /
                qr.total_questions,
                2
            ) AS percentage

        FROM quiz_results qr

        JOIN daily_quizzes dq
            ON qr.quiz_id = dq.id

        WHERE qr.student_id = ?

        ORDER BY dq.quiz_date DESC
        `,
        [id]
    );

    return {
        student: studentRows[0],

        stats: {
            totalAttempts: stats.totalAttempts,
            averageScore: stats.averageScore || 0,
            highestScore: stats.highestScore || 0,
            lowestScore: stats.lowestScore || 0
        },

        history
    };
};