const db = require("../config/db");

// ==========================
// Get All Daily Quizzes
// ==========================
exports.getAllQuizzes = async () => {

    const [rows] = await db.query(`
        SELECT
            dq.id,
            dq.quiz_date,

            COUNT(DISTINCT dqq.question_id) AS total_questions,

            COUNT(DISTINCT qr.student_id) AS total_attempts,

            ROUND(
                AVG(
                    (qr.score * 100.0) /
                    qr.total_questions
                ),
                2
            ) AS average_score

        FROM daily_quizzes dq

        LEFT JOIN daily_quiz_questions dqq
            ON dq.id = dqq.daily_quiz_id

        LEFT JOIN quiz_results qr
            ON dq.id = qr.quiz_id

        GROUP BY dq.id

        ORDER BY dq.quiz_date DESC
    `);

    return rows;
};

// ==========================
// Quiz Details
// ==========================
exports.getQuizDetails = async (quizId) => {

    const [rows] = await db.query(`
        SELECT
            q.id,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
            q.correct_option,
            q.subject,
            q.difficulty

        FROM daily_quiz_questions dq

        JOIN questions q
            ON dq.question_id = q.id

        WHERE dq.daily_quiz_id = ?
    `, [quizId]);

    return rows;
};

// ==========================
// Get Students Attempted Quiz
// ==========================
exports.getQuizStudents = async (quizId) => {

    const [rows] = await db.query(`
        SELECT
            s.id,
            s.full_name,
            s.email,

            qr.score,
            qr.total_questions,

            ROUND(
                (qr.score * 100.0) /
                qr.total_questions,
                2
            ) AS percentage

        FROM quiz_results qr

        JOIN students s
            ON qr.student_id = s.id

        WHERE qr.quiz_id = ?

        ORDER BY percentage DESC,
                 s.full_name ASC
    `, [quizId]);

    return rows;
};

// ==========================
// Delete Quiz
// ==========================
exports.deleteQuiz = async (quizId) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        // Delete all student results
        await connection.query(
            `
            DELETE FROM quiz_results
            WHERE quiz_id = ?
            `,
            [quizId]
        );

        // Delete quiz questions
        await connection.query(
            `
            DELETE FROM daily_quiz_questions
            WHERE daily_quiz_id = ?
            `,
            [quizId]
        );

        // Delete quiz
        const [result] = await connection.query(
            `
            DELETE FROM daily_quizzes
            WHERE id = ?
            `,
            [quizId]
        );

        await connection.commit();

        return result;

    } catch (err) {

        await connection.rollback();
        throw err;

    } finally {

        connection.release();

    }

};