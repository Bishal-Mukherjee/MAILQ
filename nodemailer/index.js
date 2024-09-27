const nodemailer = require("nodemailer");
require("dotenv").config();

const dispatchEmail = async ({ to, subject, html }) => {
  if (!to || !subject || !html) {
    console.log("parameters missing");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SENDER_HOST,
    port: process.env.SENDER_PORT,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { dispatchEmail };
