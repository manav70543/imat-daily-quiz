const bcrypt = require("bcrypt");
const crypto = require("crypto");

const studentModel = require("../models/studentModel");
const generateToken = require("../utils/generateToken");
const sendMail = require("../utils/mailer");

// ===========================
// Register Student
// ===========================
exports.register = async (studentData) => {

    const { full_name, email, password } = studentData;

    const existingStudent =
        await studentModel.findStudentByEmail(email);

    if (existingStudent.length > 0) {

        return {
            status: 400,
            message: "Email already exists"
        };

    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const verificationToken =
        crypto.randomBytes(32).toString("hex");

    const verificationExpiry =
        new Date(Date.now() + 24 * 60 * 60 * 1000);

    await studentModel.createStudent(
        full_name,
        email,
        hashedPassword,
        verificationToken,
        verificationExpiry
    );

    // IMPORTANT: Send user to BACKEND first
    const verificationLink =
        `${process.env.SERVER_URL}/api/students/verify-email/${verificationToken}`;

    console.log("\n==============================");
    console.log("Verification Link:");
    console.log(verificationLink);
    console.log("==============================\n");

    await sendMail(
        email,
        "Verify Your IMAT Daily Quiz Account",
        `
        <h2>Welcome to IMAT Daily Quiz</h2>

        <p>
            Please verify your email address by clicking the button below.
        </p>

        <a
            href="${verificationLink}"
            style="
                background:#2563eb;
                color:white;
                padding:12px 20px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;
            "
        >
            Verify Email
        </a>

        <p>
            This verification link expires in <b>24 hours</b>.
        </p>
        `
    );

    return {
        status: 201,
        message:
            "Registration successful. Please check your Inbox or Spam folder to verify your account."
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