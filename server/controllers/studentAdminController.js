const studentAdminService = require("../services/studentAdminService");

exports.getAllStudents = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await studentAdminService.getAllStudents(
            page,
            limit
        );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

exports.searchStudents = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    const result =
      await studentAdminService.searchStudents(keyword);

    res.status(result.status).json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getStudentById = async (req, res) => {

    try {

        const result =
            await studentAdminService.getStudentById(
                req.params.id
            );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
exports.getStudentDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
            await studentAdminService.getStudentDetails(id);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
// ==========================
// Student Attempt Details
// ==========================
exports.getStudentAttempt = async (req, res) => {

    try {

        const { studentId, quizId } = req.params;

        const result =
            await studentAdminService.getStudentAttempt(
                studentId,
                quizId
            );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

// ==========================
// Delete Student
// ==========================
exports.deleteStudent = async (req, res) => {

    try {

        const { id } = req.params;

        const result =
            await studentAdminService.deleteStudent(id);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};