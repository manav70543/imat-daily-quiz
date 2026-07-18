
const adminModel = require("../models/adminModel");
const generateToken = require("../utils/generateToken");

exports.login = async (email, password) => {

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const admin = await adminModel.findAdminByEmail(email);

    console.log(admin);

    if (admin.length === 0) {
        return {
            status: 404,
            message: "Admin not found"
        };
    }

    if (admin[0].password !== password) {
        return {
            status: 401,
            message: "Invalid password"
        };
    }

    const token = generateToken(admin[0].id, "admin");

    return {
        status: 200,
        token,
        admin: {
            id: admin[0].id,
            full_name: admin[0].full_name,
            email: admin[0].email
        }
    };
};

exports.getDashboardStats = async () => {

    const dashboard =
        await adminModel.getDashboardStats();

    return {
        status: 200,
        dashboard
    };

};
exports.getRecentStudents = async () => {

    const students =
        await adminModel.getRecentStudents();

    return {
        status: 200,
        students
    };

};