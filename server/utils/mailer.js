const nodemailer = require("nodemailer");

// ===========================
// Gmail SMTP Configuration
// ===========================
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    // Fail instead of hanging forever
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
});

// ===========================
// Send Email
// ===========================
const sendMail = async (to, subject, html) => {

    try {

        console.log("================================");
        console.log("Sending email through Gmail...");
        console.log("From:", process.env.EMAIL_USER);
        console.log("To:", to);
        console.log("================================");

        const info = await transporter.sendMail({
            from: `"IMAT Daily Quiz" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("========== EMAIL SUCCESS ==========");
        console.log("Message ID:", info.messageId);
        console.log("===================================");

        return info;

    } catch (err) {

        console.error("========== MAIL ERROR ==========");
        console.error("Code:", err.code);
        console.error("Message:", err.message);
        console.error("================================");

        throw err;
    }
};

module.exports = sendMail;