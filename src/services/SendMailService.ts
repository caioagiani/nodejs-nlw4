import fs from 'fs';
import { compile } from 'handlebars';
import { createTransport } from 'nodemailer';

class SendMailService {
  async execute({ name, to, subject, description, path, user_id, link }) {
    const templateFileContent = fs.readFileSync(path).toString('utf8');
    const mailTemplateParse = compile(templateFileContent);
    const html = mailTemplateParse({
      name,
      title: subject,
      description,
      user_id,
      link,
    });

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
      html,
      from: `noreply <${process.env.SMTP_USER}>`,
    });
  }
}

export default new SendMailService();
