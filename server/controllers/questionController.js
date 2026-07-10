const questionService = require("../services/questionService");

exports.getAllQuestions = async (req, res) => {

    const result = await questionService.getAllQuestions();

    res.status(result.status).json(result);
};

exports.addQuestion = async (req, res) => {

    const result = await questionService.addQuestion(req.body);

    res.status(result.status).json(result);
};