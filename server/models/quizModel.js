const db = require("../config/db");

// Find today's quiz
exports.findTodayQuiz = async (quizDate) => {
    const [rows] = await db.query(
        "SELECT * FROM daily_quizzes WHERE quiz_date = ?",
        [quizDate]
    );

    return rows;
};

// Create today's quiz
exports.createTodayQuiz = async (quizDate) => {
    const [result] = await db.query(
        "INSERT INTO daily_quizzes (quiz_date) VALUES (?)",
        [quizDate]
    );

    return result.insertId;
};

// Get 10 random questions
exports.getRandomQuestions = async () => {
    const [rows] = await db.query(
        `
        SELECT id
        FROM questions
        ORDER BY RAND()
        LIMIT 10
        `
    );

    return rows;
};

// Save question into today's quiz
exports.addQuestionToQuiz = async (quizId, questionId) => {
    await db.query(
        `
        INSERT INTO daily_quiz_questions
        (quiz_id, question_id)
        VALUES (?, ?)
        `,
        [quizId, questionId]
    );
};

// Get quiz questions
exports.getQuizQuestions = async (quizId) => {
    const [rows] = await db.query(
        `
        SELECT
            q.id,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.subject,
            q.difficulty
        FROM daily_quiz_questions dq
        JOIN questions q
            ON dq.question_id = q.id
        WHERE dq.quiz_id = ?
        `,
        [quizId]
    );

    return rows;
};

// Get correct answers for submitted quiz
exports.getCorrectAnswers = async (quizId) => {
    const [rows] = await db.query(
        `
        SELECT
            q.id,
            q.correct_option
        FROM daily_quiz_questions dq
        JOIN questions q
            ON dq.question_id = q.id
        WHERE dq.quiz_id = ?
        `,
        [quizId]
    );

    return rows;
};

// Save quiz result
exports.saveQuizResult = async (
    studentId,
    quizId,
    score,
    totalQuestions
) => {
    const [result] = await db.query(
        `
        INSERT INTO quiz_results
        (student_id, quiz_id, score, total_questions)
        VALUES (?, ?, ?, ?)
        `,
        [studentId, quizId, score, totalQuestions]
    );

    return result.insertId;
};

// Check if student already submitted today's quiz
exports.hasSubmittedQuiz = async (studentId, quizId) => {
    const [rows] = await db.query(
        `SELECT id
         FROM quiz_results
         WHERE student_id = ?
         AND quiz_id = ?`,
        [studentId, quizId]
    );

    return rows.length > 0;
};
// Get student's quiz history
exports.getQuizHistory = async (studentId) => {
    const [rows] = await db.query(
        `SELECT
            dq.quiz_date,
            qr.score,
            qr.total_questions
         FROM quiz_results qr
         JOIN daily_quizzes dq
             ON qr.quiz_id = dq.id
         WHERE qr.student_id = ?
         ORDER BY dq.quiz_date DESC`,
        [studentId]
    );

    return rows;
};
// Get leaderboard
exports.getLeaderboard = async () => {
    const [rows] = await db.query(`
        SELECT
            s.id AS student_id,
            s.full_name,
            COUNT(qr.id) AS attempts,
            ROUND(
                AVG((qr.score * 100.0) / qr.total_questions),
                2
            ) AS average_score
        FROM students s
        JOIN quiz_results qr
            ON s.id = qr.student_id
        GROUP BY s.id, s.full_name
        ORDER BY average_score DESC;
    `);

    return rows;
};
// Get admin dashboard statistics
exports.getDashboardStats = async () => {

    const [[students]] = await db.query(
        "SELECT COUNT(*) AS totalStudents FROM students"
    );

    const [[questions]] = await db.query(
        "SELECT COUNT(*) AS totalQuestions FROM questions"
    );

    const [[quizzes]] = await db.query(
        "SELECT COUNT(*) AS totalQuizzes FROM daily_quizzes"
    );

    const [[attempts]] = await db.query(
        "SELECT COUNT(*) AS totalAttempts FROM quiz_results"
    );

    const [[average]] = await db.query(`
        SELECT
            ROUND(AVG((score * 100.0) / total_questions), 2) AS averageScore
        FROM quiz_results
    `);

    return {
        totalStudents: students.totalStudents,
        totalQuestions: questions.totalQuestions,
        totalQuizzes: quizzes.totalQuizzes,
        totalAttempts: attempts.totalAttempts,
        averageScore: average.averageScore || 0
    };

};