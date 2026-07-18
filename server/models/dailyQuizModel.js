const db = require("../config/db");

// ==========================
// Check if today's quiz already exists
// ==========================
exports.getTodayQuiz = async (today) => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM daily_quizzes
        WHERE quiz_date = ?
        `,
        [today]
    );

    return rows;
};

// ==========================
// Create today's quiz
// ==========================
exports.createQuiz = async (today) => {

    const [result] = await db.query(
        `
        INSERT INTO daily_quizzes (quiz_date)
        VALUES (?)
        `,
        [today]
    );

    return result.insertId;
};

// ==========================
// Get random questions by subject
// ==========================
exports.getRandomQuestions = async (subject, limit) => {

    const [rows] = await db.query(
        `
        SELECT id
        FROM questions
        WHERE subject = ?
        ORDER BY RAND()
        LIMIT ?
        `,
        [subject, limit]
    );

    return rows;
};

// ==========================
// Save selected question to today's quiz
// ==========================
exports.saveQuizQuestion = async (quizId, questionId) => {

    await db.query(
        `
    INSERT INTO daily_quiz_questions
    (
        daily_quiz_id,
        question_id
    )
    VALUES (?, ?)
    `,
        [quizId, questionId]
    );

};

// ==========================
// Get all questions of today's quiz
// ==========================
exports.getQuizQuestions = async (quizId) => {

    const [rows] = await db.query(
        `
        SELECT q.*
        FROM daily_quiz_questions dq

        JOIN questions q
            ON dq.question_id = q.id

        WHERE dq.daily_quiz_id = ?
        `,
        [quizId]
    );

    return rows;
};