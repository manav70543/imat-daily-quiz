const db = require("../config/db");

exports.findAdminByEmail = async (email) => {
    const [rows] = await db.query(
        `
        SELECT *
        FROM admins
        WHERE email = ?
        `,
        [email]
    );

    return rows;
};

exports.getDashboardStats = async () => {

    const [[students]] = await db.query(`
        SELECT COUNT(*) AS totalStudents
        FROM students
    `);

    const [[questions]] = await db.query(`
        SELECT COUNT(*) AS totalQuestions
        FROM questions
    `);

    const [[quizzes]] = await db.query(`
       SELECT COUNT(*) AS totalQuizzes
       FROM daily_quizzes
    `);

    const [[attempts]] = await db.query(`
        SELECT COUNT(*) AS totalAttempts
        FROM quiz_results
    `);

    return {
        totalStudents: students.totalStudents,
        totalQuestions: questions.totalQuestions,
        totalQuizzes: quizzes.totalQuizzes,
        totalAttempts: attempts.totalAttempts
    };
};