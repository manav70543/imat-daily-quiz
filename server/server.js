const express = require("express");
const cors = require("cors");
require("dotenv").config();

const helmet = require("helmet");
const apiLimiter = require("./middleware/rateLimiter");

// Database
require("./config/db");

// Routes
const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");
const quizRoutes = require("./routes/quizRoutes");

const adminRoutes = require("./routes/adminRoutes");
const studentAdminRoutes = require("./routes/studentAdminRoutes");
const subjectAdminRoutes = require("./routes/subjectAdminRoutes");
const questionAdminRoutes = require("./routes/questionAdminRoutes");
const adminQuizRoutes = require("./routes/adminQuizRoutes");
const importRoutes = require("./routes/importRoutes");
const importAllRoutes = require("./routes/importAllRoutes");
const dailyQuizRoutes = require("./routes/dailyQuizRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// Global Middleware
// ========================================

// Security Headers
app.use(helmet());

// CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Rate Limiter (100 requests / 15 minutes)
app.use(apiLimiter);

// ========================================
// Student APIs
// ========================================
app.use("/api/students", studentRoutes);

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