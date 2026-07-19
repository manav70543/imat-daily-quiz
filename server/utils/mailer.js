const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = async (to, subject, html) => {

    try {

        console.log("Sending email...");
        console.log("From:", process.env.EMAIL_USER);
        console.log("To:", to);

        const info = await transporter.sendMail({
            from: `"IMAT Daily Quiz" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("SUCCESS:");
        console.log(info);

    } catch (err) {

        console.log("========== MAIL ERROR ==========");
        console.log(err);
        console.log("================================");

        throw err;
    }
};

module.exports = sendMail;