import nodemailer from 'nodemailer';
import { config } from '@/lib/config';

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: config.email.mailtrap.user,
    pass: config.email.mailtrap.pass,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${config.apiUrl}/verify-email?token=${token}`;
  
  await transporter.sendMail({
    from: '"URExpert" <noreply@urexpert.ai>',
    to: email,
    subject: "Verify your email address",
    html: `
      <h1>Welcome to URExpert!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${config.apiUrl}/reset-password?token=${token}`;
  
  await transporter.sendMail({
    from: '"URExpert" <noreply@urexpert.ai>',
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });
};