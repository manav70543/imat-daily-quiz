const bcrypt = require("bcrypt");

const studentModel = require("../models/studentModel");
const generateToken = require("../utils/generateToken");

// ===========================
// Register Student
// ===========================
exports.register = async (studentData) => {
    const { full_name, email, password } = studentData;

    // Check if email already exists
    const existingStudent =
        await studentModel.findStudentByEmail(email);

    if (existingStudent.length > 0) {
        return {
            status: 400,
            message: "Email already exists"
        };
    }

    // Hash password
    const hashedPassword =
        await bcrypt.hash(password, 10);

    // Create student
    await studentModel.createStudent(
        full_name,
        email,
        hashedPassword
    );

    return {
        status: 201,
        message: "Registration successful. You can now login."
    };
};

// ===========================
// Login Student
// ===========================
exports.login = async (loginData) => {
    const { email, password } = loginData;

    const students =
        await studentModel.findStudentByEmail(email);

    if (students.length === 0) {
        return {
            status: 404,
            message: "Student not found"
        };
    }

    const student = students[0];

    const isMatch =
        await bcrypt.compare(password, student.password);

    if (!isMatch) {
        return {
            status: 401,
            message: "Invalid password"
        };
    }

    const token =
        generateToken(student.id);

    return {
        status: 200,
        message: "Login successful",
        token,
        student: {
            id: student.id,
            full_name: student.full_name,
            email: student.email
        }
    };
};

// ===========================
// Get Student Profile
// ===========================
exports.getProfile = async (studentId) => {
    const students =
        await studentModel.findStudentById(studentId);

    if (students.length === 0) {
        return {
            status: 404,
            message: "Student not found"
        };
    }

    return {
        status: 200,
        student: students[0]
    };
};

// ===========================
// Get Student Details
// ===========================
exports.getStudentDetails = async (id) => {
    const result =
        await studentModel.getStudentDetails(id);

    if (!result) {
        return {
            status: 404,
            message: "Student not found"
        };
    }

    return {
        status: 200,
        ...result
    };
};