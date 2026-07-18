const fs = require("fs");
const csv = require("csv-parser");

const importModel = require("../models/importModel");

exports.importQuestions = (filePath) => {

    return new Promise((resolve, reject) => {

        const questions = [];

        fs.createReadStream(filePath)
            .pipe(csv())

            .on("data", (row) => {

                questions.push(row);

            })

            .on("end", async () => {

                try {

                    let imported = 0;

                    for (const question of questions) {

                        const inserted =
                            await importModel.insertQuestion(question);

                        if (inserted) {
                            imported++;
                        }

                    }

                    fs.unlinkSync(filePath);

                    resolve({
                        total: imported
                    });

                } catch (err) {

                    reject(err);

                }

            })

            .on("error", reject);

    });

};