const studentService = require("../services/studentService");

exports.registerStudent = async (req, res) => {

    const result = await studentService.register(req.body);

    res.status(result.status).json({
        message: result.message
    });

};

exports.loginStudent = async (req, res) => {

    const result = await studentService.login(req.body);

    res.status(result.status).json(result);

};

exports.getProfile = async (req, res) => {

    const result = await studentService.getProfile(req.student.id);

    res.status(result.status).json(result);

};