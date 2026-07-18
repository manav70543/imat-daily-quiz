const questionAdminService = require("../services/questionAdminService");

// ==========================
// Get All Questions (Pagination)
// ==========================
exports.getAllQuestions = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await questionAdminService.getAllQuestions(
            page,
            limit
        );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Search Questions
// ==========================
exports.searchQuestions = async (req, res) => {

    try {

        const result =
            await questionAdminService.searchQuestions(
                req.query.keyword
            );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ==========================
// Filter By Subject
// ==========================
exports.filterBySubject = async (req, res) => {

    try {

        const result =
            await questionAdminService.filterBySubject(
                req.query.subject
            );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ==========================
// Add Question
// ==========================
exports.addQuestion = async (req, res) => {

    try {

        const {
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty
        } = req.body;

        const result =
            await questionAdminService.addQuestion(
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option,
                subject,
                difficulty
            );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ==========================
// Update Question
// ==========================
exports.updateQuestion = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_option,
            subject,
            difficulty
        } = req.body;

        const result =
            await questionAdminService.updateQuestion(
                id,
                question,
                option_a,
                option_b,
                option_c,
                option_d,
                correct_option,
                subject,
                difficulty
            );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// ==========================
// Delete Question
// ==========================
exports.deleteQuestion = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
            await questionAdminService.deleteQuestion(id);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};