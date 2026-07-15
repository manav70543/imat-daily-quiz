const adminService = require("../services/adminService");

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await adminService.login(
            email,
            password
        );

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

exports.getDashboardStats = async (req, res) => {

    try {

        const result =
            await adminService.getDashboardStats();

        res.status(result.status).json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};