const passwordService =
    require("../services/passwordService");

exports.changePassword = async (req, res) => {

    try {

        const {
            oldPassword,
            newPassword,
            confirmPassword
        } = req.body;

        const studentId = req.user.id;

        const result =
            await passwordService.changePassword(
                studentId,
                oldPassword,
                newPassword,
                confirmPassword
            );

        res
            .status(result.status)
            .json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({

            message: "Internal Server Error"

        });

    }

};