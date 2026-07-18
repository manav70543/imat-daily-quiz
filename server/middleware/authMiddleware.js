const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    console.log("=== AUTH MIDDLEWARE ===");
    console.log("URL:", req.originalUrl);

    const authHeader = req.headers.authorization;
    console.log("Authorization:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No Bearer token");

        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("✅ Token decoded:", decoded);

        req.user = decoded;

        next();

    } catch (err) {

        console.log("❌ JWT ERROR:", err.message);

        return res.status(401).json({
            message: "Invalid token"
        });

    }
};

module.exports = authMiddleware;