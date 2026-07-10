const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const questionRoutes = require("./routes/questionRoutes");

require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/questions", questionRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 IMAT Daily Quiz API is Running!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});