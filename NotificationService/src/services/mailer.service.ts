import { transporter } from "../config/mailer.config";
import { serverConfig } from "../config";

interface SendEmailArgs {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailArgs) {
  await transporter.sendMail({
    from: serverConfig.MAIL_FROM,
    to,
    subject,
    html,
  });
}