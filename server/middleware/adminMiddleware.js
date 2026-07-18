const adminMiddleware = (req, res, next) => {

    console.log("=== ADMIN MIDDLEWARE ===");
    console.log("User:", req.user);

    if (!req.user) {
        console.log("❌ No req.user");

        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    if (req.user.role !== "admin") {
        console.log("❌ Wrong role:", req.user.role);

        return res.status(403).json({
            message: "Access denied. Admins only."
        });
    }

    console.log("✅ Admin verified");

    next();
};

module.exports = adminMiddleware;