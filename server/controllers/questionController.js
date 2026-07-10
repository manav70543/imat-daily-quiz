const questionService = require("../services/questionService");

exports.getAllQuestions = async (req, res) => {

    const result = await questionService.getAllQuestions();

    res.status(result.status).json(result);
};

exports.addQuestion = async (req, res) => {

    const result = await questionService.addQuestion(req.body);

    res.status(result.status).json(result);
};

exports.getQuestionById = async (req, res) => {

    const result = await questionService.getQuestionById(req.params.id);

    res.status(result.status).json(result);

};

exports.updateQuestion = async (req, res) => {

    const result = await questionService.updateQuestion(
        req.params.id,
        req.body
    );

    res.status(result.status).json(result);

};

exports.deleteQuestion = async (req, res) => {

    const result = await questionService.deleteQuestion(req.params.id);

    res.status(result.status).json(result);

};