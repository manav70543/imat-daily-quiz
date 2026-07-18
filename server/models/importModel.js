const db = require("../config/db");

exports.insertQuestion = async (question) => {

    const [existing] = await db.query(
        `
        SELECT id
        FROM questions
        WHERE question = ?
        AND subject = ?
        `,
        [
            question.question,
            question.subject
        ]
    );

    if (existing.length > 0) {
        return false;
    }

    const sql = `
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
    `;

    await db.query(sql, [
        question.question,
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
        question.correct_option,
        question.subject,
        question.difficulty
    ]);

    return true;
};