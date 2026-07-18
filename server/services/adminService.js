const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");
const generateToken = require("../utils/generateToken");

// ===========================
// Admin Login
// ===========================
exports.login = async (email, password) => {

    console.log("=================================");
    console.log("LOGIN ATTEMPT");
    console.log("Email Entered:", email);
    console.log("Password Entered:", password);

    const admin = await adminModel.findAdminByEmail(email);

    console.log("Admin From DB:", admin);

    if (admin.length === 0) {
        console.log("❌ Admin not found");

        return {
            status: 404,
            message: "Admin not found"
        };
    }

    console.log("Stored Hash:", admin[0].password);

    const isMatch = await bcrypt.compare(
        password,
        admin[0].password
    );

    console.log("Password Match:", isMatch);

    if (!isMatch) {
        console.log("❌ Invalid Password");

        return {
            status: 401,
            message: "Invalid password"
        };
    }

    console.log("✅ Login Success");

    const token = generateToken(
        admin[0].id,
        "admin"
    );

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

// ===========================
// Dashboard Statistics
// ===========================
exports.getDashboardStats = async () => {

    const dashboard =
        await adminModel.getDashboardStats();

    return {
        status: 200,
        dashboard
    };

};

// ===========================
// Recent Students
// ===========================
exports.getRecentStudents = async () => {

    const students =
        await adminModel.getRecentStudents();

    return {
        status: 200,
        students
    };

};