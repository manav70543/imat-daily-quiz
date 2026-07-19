const db = require("../config/db");

exports.findStudentByEmail = async (email) => {

    const [rows] = await db.query(
        "SELECT * FROM students WHERE email = ?",
        [email]
    );

    return rows;

};

exports.createStudent = async (
    full_name,
    email,
    password,
    verificationToken,
    verificationExpiry
) => {

    const [result] = await db.query(
        `
        INSERT INTO students
        (
            full_name,
            email,
            password,
            email_verified,
            verification_token,
            verification_token_expiry
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            full_name,
            email,
            password,
            0,
            verificationToken,
            verificationExpiry
        ]
    );

    return result;

};

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
            ROUND(AVG(score),2) AS averageScore,
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