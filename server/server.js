const express = require("express");
const cors = require("cors");
require("dotenv").config();

const helmet = require("helmet");
const apiLimiter = require("./middleware/rateLimiter");

// ========================================
// Database
// ========================================
require("./config/db");

// ========================================
// Student Routes
// ========================================
const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");

// Change Password
const passwordRoutes = require("./routes/passwordRoutes");

// Forgot Password
const passwordResetRoutes = require("./routes/passwordResetRoutes");

// ========================================
// Admin Routes
// ========================================
const adminRoutes = require("./routes/adminRoutes");
const studentAdminRoutes = require("./routes/studentAdminRoutes");
const subjectAdminRoutes = require("./routes/subjectAdminRoutes");
const questionAdminRoutes = require("./routes/questionAdminRoutes");
const adminQuizRoutes = require("./routes/adminQuizRoutes");

// ========================================
// Import Routes
// ========================================
const importRoutes = require("./routes/importRoutes");
const importAllRoutes = require("./routes/importAllRoutes");

// ========================================
// Daily Quiz Routes
// ========================================
const dailyQuizRoutes = require("./routes/dailyQuizRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// Global Middleware
// ========================================

// Security Headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Rate Limiter
app.use(apiLimiter);

// ========================================
// Student APIs
// ========================================

app.use("/api/students", studentRoutes);

// Change Password
app.use("/api/students", passwordRoutes);

// Forgot Password
app.use("/api/password", passwordResetRoutes);

// ========================================
// Question APIs
// ========================================

app.use("/api/questions", questionRoutes);

// ========================================
// Quiz APIs
// ========================================

app.use("/api/quizzes", quizRoutes);

// ========================================
// Admin Authentication
// ========================================

app.use("/api/admin", adminRoutes);

// ========================================
// Admin Management APIs
// ========================================

app.use("/api/admin", studentAdminRoutes);
app.use("/api/admin", subjectAdminRoutes);
app.use("/api/admin", questionAdminRoutes);
app.use("/api/admin", adminQuizRoutes);

// ========================================
// CSV Import APIs
// ========================================

app.use("/api/import", importRoutes);
app.use("/api/admin", importAllRoutes);

// ========================================
// Daily Quiz APIs
// ========================================

app.use("/api/admin/quiz", dailyQuizRoutes);

// ========================================
// Test Route
// ========================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 IMAT Daily Quiz API is Running!"
    });
});

// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});