const db = require("../config/db");

exports.findStudentByEmail = async (email) => {
    const [rows] = await db.query(
        "SELECT * FROM students WHERE email = ?",
        [email]
    );

    return rows;
};

exports.createStudent = async (full_name, email, password) => {
    const [result] = await db.query(
        `INSERT INTO students (full_name, email, password)
         VALUES (?, ?, ?)`,
        [full_name, email, password]
    );

    return result;
};

exports.findStudentById = async (id) => {
    const [rows] = await db.query(
        "SELECT id, full_name, email, created_at FROM students WHERE id = ?",
        [id]
    );

    return rows;
};