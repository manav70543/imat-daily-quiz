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
            s.full_name AS name,
            ROUND(
                AVG((qr.score * 100.0) / qr.total_questions),
                2
            ) AS score
        FROM students s
        JOIN quiz_results qr
            ON s.id = qr.student_id
        GROUP BY s.id, s.full_name
        ORDER BY score DESC
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

exports.getStudentQuizResult = async (studentId, quizId) => {

    const [rows] = await db.query(
        `
        SELECT
            score,
            total_questions
        FROM quiz_results
        WHERE student_id = ?
        AND quiz_id = ?
        `,
        [studentId, quizId]
    );

    return rows;
};

exports.getQuizReview = async (quizId) => {

    const [rows] = await db.query(
        `
        SELECT
            q.id,
            q.question,
            q.option_a,
            q.option_b,
            q.option_c,
            q.option_d,
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

exports.getStudentAnswers = async (studentId, quizId) => {

    const [rows] = await db.query(
        `
        SELECT
            question_id,
            selected_option
        FROM student_answers
        WHERE student_id = ?
        AND quiz_id = ?
        `,
        [studentId, quizId]
    );

    return rows;
};

exports.saveStudentAnswer = async (
    studentId,
    quizId,
    questionId,
    selectedOption
) => {

    await db.query(
        `
        INSERT INTO student_answers
        (student_id, quiz_id, question_id, selected_option)
        VALUES (?, ?, ?, ?)
        `,
        [
            studentId,
            quizId,
            questionId,
            selectedOption
        ]
    );

};
exports.getStudentDashboard = async (studentId) => {

    const [[attempted]] = await db.query(
        `
        SELECT COUNT(*) AS quizzesAttempted
        FROM quiz_results
        WHERE student_id = ?
        `,
        [studentId]
    );

    const [[average]] = await db.query(
        `
        SELECT
        ROUND(AVG((score * 100.0) / total_questions),2) AS averageScore
        FROM quiz_results
        WHERE student_id = ?
        `,
        [studentId]
    );

    const [[best]] = await db.query(
        `
    SELECT
        ROUND(
            MAX((score * 100.0) / total_questions),
            2
        ) AS bestScore
    FROM quiz_results
    WHERE student_id = ?
    `,
        [studentId]
    );

    const [[today]] = await db.query(
        `
        SELECT COUNT(*) AS completed
        FROM quiz_results qr
        JOIN daily_quizzes dq
        ON qr.quiz_id = dq.id
        WHERE qr.student_id = ?
        AND dq.quiz_date = CURDATE()
        `,
        [studentId]
    );

    return {
        quizzesAttempted: attempted.quizzesAttempted,
        averageScore: average.averageScore || 0,
        bestScore: best.bestScore || 0,
        todayCompleted: today.completed > 0
    };
};
exports.getWeeklyPerformance = async (studentId) => {

    const [rows] = await db.query(
        `
        SELECT
            DATE_FORMAT(dq.quiz_date,'%a') AS day,
            ROUND((qr.score * 100.0) / qr.total_questions,2) AS score,
            DAYOFWEEK(dq.quiz_date) AS dayNumber
        FROM quiz_results qr
        JOIN daily_quizzes dq
            ON qr.quiz_id = dq.id
        WHERE qr.student_id = ?
        AND dq.quiz_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        ORDER BY dq.quiz_date
        `,
        [studentId]
    );

    // Create all 7 days
    const week = [
        { day: "Sun", score: 0 },
        { day: "Mon", score: 0 },
        { day: "Tue", score: 0 },
        { day: "Wed", score: 0 },
        { day: "Thu", score: 0 },
        { day: "Fri", score: 0 },
        { day: "Sat", score: 0 }
    ];

    rows.forEach(row => {

        const index = week.findIndex(d => d.day === row.day);

        if (index !== -1) {
            week[index].score = Number(row.score);
        }

    });

    return week;
};


exports.getSubjectPerformance = async (studentId) => {

    const [rows] = await db.query(
        `
        SELECT
            q.subject,
            ROUND(
                AVG(
                    CASE
                        WHEN sa.selected_option = q.correct_option
                        THEN 100
                        ELSE 0
                    END
                ),
            2) AS score
        FROM student_answers sa

        JOIN questions q
            ON sa.question_id = q.id

        WHERE sa.student_id = ?

        GROUP BY q.subject

        ORDER BY score DESC
        `,
        [studentId]
    );

    return rows;
};

exports.getCurrentStreak = async (studentId) => {

    const [rows] = await db.query(
        `
        SELECT DATE(dq.quiz_date) AS quiz_date
        FROM quiz_results qr
        JOIN daily_quizzes dq
            ON qr.quiz_id = dq.id
        WHERE qr.student_id = ?
        ORDER BY dq.quiz_date DESC
        `,
        [studentId]
    );

    if (rows.length === 0) {
        return 0;
    }

    let streak = 0;

    let expectedDate = new Date();
    expectedDate.setHours(0, 0, 0, 0);

    const latest = new Date(rows[0].quiz_date);
    latest.setHours(0, 0, 0, 0);

    const firstDiff = Math.floor(
        (expectedDate - latest) / (1000 * 60 * 60 * 24)
    );

    if (firstDiff === 1) {
        expectedDate.setDate(expectedDate.getDate() - 1);
    }

    for (const row of rows) {

        const quizDate = new Date(row.quiz_date);
        quizDate.setHours(0, 0, 0, 0);

        if (quizDate.getTime() === expectedDate.getTime()) {
            streak++;
            expectedDate.setDate(expectedDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
};

exports.getAchievements = async (studentId) => {

    const dashboard = await exports.getStudentDashboard(studentId);

    const streak = await exports.getCurrentStreak(studentId);

    return [
        {
            title: "First Quiz",
            icon: "🥇",
            unlocked: dashboard.quizzesAttempted >= 1
        },
        {
            title: "Perfect Score",
            icon: "💯",
            unlocked: dashboard.bestScore >= 100
        },
        {
            title: "7 Day Streak",
            icon: "🔥",
            unlocked: streak >= 7
        },
        {
            title: "25 Quizzes",
            icon: "📚",
            unlocked: dashboard.quizzesAttempted >= 25
        }
    ];
};
exports.getStudentXP = async (studentId) => {

    const [rows] = await db.query(
        `
        SELECT score
        FROM quiz_results
        WHERE student_id = ?
        `,
        [studentId]
    );

    return rows;
};
exports.getStudentProfile = async (studentId) => {

    const [rows] = await db.query(
        `
        SELECT
            full_name,
            email,
            created_at
        FROM students
        WHERE id = ?
        `,
        [studentId]
    );

    return rows[0];

};