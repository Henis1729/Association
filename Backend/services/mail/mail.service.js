const templates = require('./mail.templates');
const env = require('../../config/env.config');

const transporter = require('../../config/mail.config');

module.exports = {
  sendOTP: async ({ email, name, otp }) => {
    //* TEMPORARILY DISABLED - Mail service will use dummy transporter
    let mailOptions = {
      from: env.EMAIL_USER || 'noreply@association.com',
      to: `${email}`,

      subject: `${env.PROJECT_NAME || 'Association'} | OTP`,
      text: 'One Time Password To Verify Your Account',
      html: templates.sendOTP({ otp, name }),
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  },
};
