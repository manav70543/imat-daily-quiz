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
console.log("NEW DASHBOARD API RUNNING");
    const [
        [[students]],
        [[subjects]],
        [[questions]],
        [[quizzes]],
        [[attempts]],
        [[todayAttempts]],
        [[scoreStats]]
    ] = await Promise.all([

        db.query(`
            SELECT COUNT(*) AS totalStudents
            FROM students
        `),

        db.query(`
            SELECT COUNT(*) AS totalSubjects
            FROM subjects
        `),

        db.query(`
            SELECT COUNT(*) AS totalQuestions
            FROM questions
        `),

        db.query(`
            SELECT COUNT(*) AS totalQuizzes
            FROM daily_quizzes
        `),

        db.query(`
            SELECT COUNT(*) AS totalAttempts
            FROM quiz_results
        `),

        db.query(`
            SELECT COUNT(*) AS todayAttempts
            FROM quiz_results qr
            JOIN daily_quizzes dq
                ON qr.quiz_id = dq.id
            WHERE dq.quiz_date = CURDATE()
        `),

        db.query(`
            SELECT
                ROUND(AVG(score),2) AS averageScore,
                MAX(score) AS highestScore,
                MIN(score) AS lowestScore
            FROM quiz_results
        `)

    ]);

    return {
        totalStudents: students.totalStudents,
        totalSubjects: subjects.totalSubjects,
        totalQuestions: questions.totalQuestions,
        totalQuizzes: quizzes.totalQuizzes,
        totalAttempts: attempts.totalAttempts,

        todayAttempts: todayAttempts.todayAttempts,

        averageScore: scoreStats.averageScore || 0,
        highestScore: scoreStats.highestScore || 0,
        lowestScore: scoreStats.lowestScore || 0
    };
};
exports.getRecentStudents = async () => {

    const [rows] = await db.query(`
        SELECT
            id,
            full_name,
            email,
            created_at
        FROM students
        ORDER BY created_at DESC
        LIMIT 5
    `);

    return rows;

};