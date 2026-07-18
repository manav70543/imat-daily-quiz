const db = require("../config/db");

// ==========================
// Get All Students (Pagination)
// ==========================
exports.getAllStudents = async (limit, offset) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            full_name,
            email,
            xp,
            level,
            created_at
        FROM students
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
        `,
        [limit, offset]
    );

    return rows;

};

// ==========================
// Total Students
// ==========================
exports.getTotalStudents = async () => {

    const [[row]] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM students
        `
    );

    return row.total;

};

// ==========================
// Search Students
// ==========================
exports.searchStudents = async (keyword) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            full_name,
            email,
            xp,
            level,
            created_at
        FROM students
        WHERE
            full_name LIKE ?
            OR email LIKE ?
        ORDER BY id DESC
        `,
        [`%${keyword}%`, `%${keyword}%`]
    );

    return rows;

};

// ==========================
// Get Student By ID
// ==========================
exports.getStudentById = async (id) => {

    const [rows] = await db.query(
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

    return rows[0];

};

// ==========================
// Get Full Student Details
// ==========================
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
            qr.quiz_id,
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
            totalAttempts: stats.totalAttempts || 0,
            averageScore: stats.averageScore || 0,
            highestScore: stats.highestScore || 0,
            lowestScore: stats.lowestScore || 0,
        },
        history,
    };

};

// ==========================
// Get Student Attempt
// ==========================
exports.getStudentAttempt = async (studentId, quizId) => {

    const [rows] = await db.query(
        `
        SELECT
            q.id,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_option,
            sa.selected_option

        FROM student_answers sa

        JOIN questions q
            ON sa.question_id = q.id

        WHERE sa.student_id = ?
        AND sa.quiz_id = ?

        ORDER BY q.id
        `,
        [studentId, quizId]
    );

    return rows;

};

exports.deleteStudent = async (id) => {

    const [result] = await db.query(
        "DELETE FROM students WHERE id = ?",
        [id]
    );

    return result;

};