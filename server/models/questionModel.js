const db = require("../config/db");

exports.findAllQuestions = async () => {
    const [rows] = await db.query(
        "SELECT * FROM questions"
    );

    return rows;
};

exports.createQuestion = async (
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
        `INSERT INTO questions
        (question, option_a, option_b, option_c, option_d, correct_option, subject, difficulty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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