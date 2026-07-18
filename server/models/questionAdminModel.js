const db = require("../config/db");

// ==========================
// Get All Questions (Pagination)
// ==========================
exports.getAllQuestions = async (limit, offset) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty,
            created_at
        FROM questions
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
        `,
        [limit, offset]
    );

    return rows;

};

// ==========================
// Total Questions
// ==========================
exports.getTotalQuestions = async () => {

    const [[row]] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM questions
        `
    );

    return row.total;

};

// ==========================
// Search Questions
// ==========================
exports.searchQuestions = async (keyword) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty,
            created_at
        FROM questions
        WHERE
            question LIKE ?
            OR subject LIKE ?
        ORDER BY id DESC
        `,
        [`%${keyword}%`, `%${keyword}%`]
    );

    return rows;

};

// ==========================
// Filter By Subject
// ==========================
exports.filterBySubject = async (subject) => {

    const [rows] = await db.query(
        `
        SELECT
            id,
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty,
            created_at
        FROM questions
        WHERE subject = ?
        ORDER BY id DESC
        `,
        [subject]
    );

    return rows;

};

// ==========================
// Add Question
// ==========================
exports.addQuestion = async (
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    subject,
    difficulty
) => {

    const [result] = await db.query(
        `
        INSERT INTO questions
        (
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty
        ]
    );

    return result;

};

// ==========================
// Update Question
// ==========================
exports.updateQuestion = async (
    id,
    question,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    subject,
    difficulty
) => {

    const [result] = await db.query(
        `
        UPDATE questions
        SET
            question = ?,
            option_a = ?,
            option_b = ?,
            option_c = ?,
            option_d = ?,
            correct_option = ?,
            subject = ?,
            difficulty = ?
        WHERE id = ?
        `,
        [
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty,
            id
        ]
    );

    return result;

};

// ==========================
// Delete Question
// ==========================
exports.deleteQuestion = async (id) => {

    const [result] = await db.query(
        `
        DELETE FROM questions
        WHERE id = ?
        `,
        [id]
    );

    return result;

};