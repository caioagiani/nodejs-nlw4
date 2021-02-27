import { createTransport } from 'nodemailer';

class SendMailService {
  async execute(to: string, subject: string, body: string) {
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      to,
      subject,
      html: body,
      from: `noreply <${process.env.SMTP_USER}>`,
    });
  }
}

export default new SendMailService();
