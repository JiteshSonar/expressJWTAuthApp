import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: "jeet03rs@gmail.com",
    pass: "Jitesh@01",
  },
});

export default transporter;
