const subjectAdminModel = require("../models/subjectAdminModel");

exports.getAllSubjects = async () => {

    const subjects =
        await subjectAdminModel.getAllSubjects();

    return {
        status: 200,
        subjects
    };

};