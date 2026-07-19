const passwordResetService = require("../services/passwordResetService");

// ====================================
// Send Reset Email
// ====================================
exports.sendResetEmail = async (req, res) => {
    console.log("===== FORGOT PASSWORD API HIT =====");

    try {

        const { email } = req.body;

        const result =
            await passwordResetService.sendResetEmail(email);

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });

    }

};

// ====================================
// Reset Password
// ====================================
exports.resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;

        const result =
            await passwordResetService.resetPassword(
                token,
                password
            );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });

    }

};