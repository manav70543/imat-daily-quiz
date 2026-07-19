require("dotenv").config();

const sendMail = require("./utils/mailer");

(async () => {
    try {
        await sendMail(
            process.env.EMAIL_USER,
            "IMAT Daily Quiz Test",
            `
            <h1>✅ Mail Working!</h1>
            <p>Your Gmail SMTP is configured correctly.</p>
            `
        );

        console.log("Email sent successfully.");
        process.exit(0);

    } catch (err) {

        console.error(err);
        process.exit(1);

    }
})();