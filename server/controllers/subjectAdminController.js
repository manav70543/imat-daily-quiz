const subjectAdminService = require("../services/subjectAdminService");

exports.getAllSubjects = async (req, res) => {

    try {

        const result =
            await subjectAdminService.getAllSubjects();

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};