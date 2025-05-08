const nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'techn3xus@gmail.com',
    pass: 'taha clsm ojrs inaj',
  },
});

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: '<techn3xus@gmail.com>',
      to,
      subject,
      text,
    });
    console.log('Email enviado: ', info.response);
  } catch (error) {
    console.error('Erro ao enviar email: ', error);
  }
}