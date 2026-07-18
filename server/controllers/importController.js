const path = require("path");
const fs = require("fs");
const importService = require("../services/importService");

// ===================================
// Import Single CSV
// ===================================
exports.importQuestions = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a CSV file."
            });
        }

        const result =
            await importService.importQuestions(req.file.path);

        res.json({
            status: 200,
            message: `${result.total} Questions Imported Successfully`
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }

};

// ===================================
// Import All CSVs
// ===================================
exports.importAllQuestions = async (req, res) => {

    try {

        const folderPath = path.join(__dirname, "../question-bank");

        const files = fs.readdirSync(folderPath)
            .filter(file => file.endsWith(".csv"));

        let totalImported = 0;

        for (const file of files) {

            const filePath = path.join(folderPath, file);

            const result =
                await importService.importQuestions(filePath);

            totalImported += result.total;

        }

        res.json({
            status: 200,
            message: `${totalImported} Questions Imported Successfully`
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });

    }

};