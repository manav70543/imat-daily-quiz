const db = require("../config/db");

exports.getAllSubjects = async () => {
    const [rows] = await db.query(`
        SELECT *
        FROM subjects
        ORDER BY id ASC
    `);

    return rows;
};