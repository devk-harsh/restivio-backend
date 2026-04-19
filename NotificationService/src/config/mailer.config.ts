import nodemailer from "nodemailer";
import { serverConfig } from "./index";

export const transporter = nodemailer.createTransport({
  host: serverConfig.SMTP_HOST,
  port: serverConfig.SMTP_PORT,
  secure: false,
  auth: {
    user: serverConfig.SMTP_USER,
    pass: serverConfig.SMTP_PASS,
  },
});