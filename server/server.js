const express = require("express");
const cors = require("cors");
require("dotenv").config();

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

// Middleware
app.use(cors());
app.use(express.json());

// Student Routes
app.use("/api/student", studentRoutes);

// Question Routes
app.use("/api/questions", questionRoutes);

// Quiz Routes
app.use("/api/quiz", quizRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Student Management
app.use("/api/admin", studentAdminRoutes);

// Subject Management
app.use("/api/admin", subjectAdminRoutes);

// Question Management
app.use("/api/admin", questionAdminRoutes);
// admin quiz routes 
app.use("/api/admin", adminQuizRoutes);
// Import CSV Routes
app.use("/api/import", importRoutes);

app.use("/api/admin", importAllRoutes);

app.use("/api/admin/quiz", dailyQuizRoutes);



// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 IMAT Daily Quiz API is Running!"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});