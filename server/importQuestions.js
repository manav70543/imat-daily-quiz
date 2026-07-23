const fs = require("fs");
const path = require("path");
const pool = require("./config/db");

// ======================================================
// CSV PARSER
// Handles commas and quoted values correctly
// ======================================================

function parseCSVLine(line) {
    const values = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {

        const char = line[i];

        if (char === '"') {

            // Handle escaped double quote ""
            if (insideQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }

        } else if (char === "," && !insideQuotes) {

            values.push(current.trim());
            current = "";

        } else {

            current += char;

        }
    }

    values.push(current.trim());

    return values;
}


// ======================================================
// IMPORT QUESTIONS
// ======================================================

async function importQuestions() {

    let connection;

    try {

        console.log("======================================");
        console.log("🚀 IMAT Question Import Started");
        console.log("======================================");

        const csvPath = path.join(
            __dirname,
            "question-bank",
            "IMAT_All_Subjects_1500_clean.csv"
        );

        // --------------------------------------------------
        // Check CSV
        // --------------------------------------------------

        if (!fs.existsSync(csvPath)) {
            throw new Error(
                `CSV file not found:\n${csvPath}`
            );
        }

        console.log("✅ CSV file found");

        const fileContent = fs.readFileSync(csvPath, "utf8");

        const lines = fileContent
            .replace(/^\uFEFF/, "")
            .split(/\r?\n/)
            .filter(line => line.trim() !== "");

        if (lines.length <= 1) {
            throw new Error("CSV contains no question data.");
        }

        console.log(`📄 CSV rows detected: ${lines.length - 1}`);


        // --------------------------------------------------
        // Database connection
        // --------------------------------------------------

        connection = await pool.getConnection();

        console.log("✅ Connected to Aiven MySQL");


        // --------------------------------------------------
        // Check existing rows
        // --------------------------------------------------

        const [existing] = await connection.query(
            "SELECT COUNT(*) AS total FROM questions_new"
        );

        console.log(
            `📊 Existing questions_new rows: ${existing[0].total}`
        );

        if (existing[0].total > 0) {

            console.log("");
            console.log("⚠️ IMPORT CANCELLED");
            console.log(
                "questions_new already contains data."
            );
            console.log(
                "This protection prevents accidental duplicate imports."
            );

            return;
        }


        // --------------------------------------------------
        // Prepare questions
        // --------------------------------------------------

        const questions = [];

        for (let i = 1; i < lines.length; i++) {

            const values = parseCSVLine(lines[i]);

            if (values.length !== 8) {

                console.log(
                    `⚠️ Skipping malformed CSV row ${i + 1}: ${values.length} columns`
                );

                continue;
            }

            const [
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option,
                subject,
                difficulty
            ] = values;

            if (
                !question ||
                !option_a ||
                !option_b ||
                !option_c ||
                !option_d ||
                !correct_option
            ) {

                console.log(
                    `⚠️ Skipping incomplete row ${i + 1}`
                );

                continue;
            }

            questions.push([
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option.toUpperCase(),
                subject,
                difficulty
            ]);
        }

        console.log(
            `✅ Valid questions prepared: ${questions.length}`
        );

        if (questions.length !== 1500) {

            throw new Error(
                `Expected 1500 questions but parsed ${questions.length}. Import stopped to prevent incomplete data.`
            );
        }


        // --------------------------------------------------
        // Transaction
        // --------------------------------------------------

        await connection.beginTransaction();

        console.log("🔄 Importing questions...");


        // --------------------------------------------------
        // Batch inserts
        // --------------------------------------------------

        const batchSize = 100;

        for (
            let start = 0;
            start < questions.length;
            start += batchSize
        ) {

            const batch = questions.slice(
                start,
                start + batchSize
            );

            const placeholders = batch
                .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
                .join(",");

            const sql = `
                INSERT INTO questions_new
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
                VALUES ${placeholders}
            `;

            const parameters = batch.flat();

            await connection.query(sql, parameters);

            console.log(
                `📥 Imported ${Math.min(
                    start + batchSize,
                    questions.length
                )}/${questions.length}`
            );
        }


        // --------------------------------------------------
        // Verify before committing
        // --------------------------------------------------

        const [result] = await connection.query(
            "SELECT COUNT(*) AS total FROM questions_new"
        );

        if (result[0].total !== 1500) {

            throw new Error(
                `Database verification failed. Expected 1500 but found ${result[0].total}.`
            );
        }


        // --------------------------------------------------
        // Commit
        // --------------------------------------------------

        await connection.commit();

        console.log("");
        console.log("======================================");
        console.log("🎉 IMPORT SUCCESSFUL");
        console.log("======================================");
        console.log(`Total questions: ${result[0].total}`);


        // --------------------------------------------------
        // Subject verification
        // --------------------------------------------------

        const [subjects] = await connection.query(`

            SELECT
                subject,
                COUNT(*) AS total

            FROM questions_new

            GROUP BY subject

            ORDER BY subject

        `);

        console.log("");
        console.log("📚 Questions by subject:");

        console.table(subjects);


        // --------------------------------------------------
        // Difficulty verification
        // --------------------------------------------------

        const [difficulty] = await connection.query(`

            SELECT
                difficulty,
                COUNT(*) AS total

            FROM questions_new

            GROUP BY difficulty

            ORDER BY difficulty

        `);

        console.log("");
        console.log("📊 Questions by difficulty:");

        console.table(difficulty);

    } catch (error) {

        if (connection) {

            try {
                await connection.rollback();
            } catch (rollbackError) {
                // Ignore rollback error
            }
        }

        console.error("");
        console.error("❌ IMPORT FAILED");
        console.error(error.message);

    } finally {

        if (connection) {
            connection.release();
        }

        await pool.end();

        process.exit();
    }
}

importQuestions();