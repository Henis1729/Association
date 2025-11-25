//* TEMPORARILY DISABLED - Mail service
// const nodemailer = require('nodemailer');

const { logger } = require('../helpers');
const env = require('./env.config');

//* TEMPORARILY DISABLED - Mail service
//* create transporter for mail server
// const transporter = nodemailer.createTransport({
//   host: env.EMAIL_HOST,
//   port: env.EMAIL_PORT,
//   //* uncomment following line if you are not using ethereal mail server
//   // secure: true,
//   auth: {
//     user: env.EMAIL_USER,
//     pass: env.EMAIL_PASSWORD,
//   },
// });

//* TEMPORARILY DISABLED - Mail service
//* verify connection configuration for mail server
// transporter.verify((error, success) => {
//   if (error) {
//     logger.error('✘ UNABLE TO CONNECT TO THE MAIL SERVER');
//     logger.error(error);
//   } else {
//     logger.info(`✔ MAIL SERVER IS READY TO SEND MAILS`);
//   }
// });

//* Return dummy transporter object to prevent errors
const transporter = {
  sendMail: async (options) => {
    logger.warn('⚠ MAIL SERVICE IS DISABLED - Email would have been sent to: ' + (options.to || 'unknown'));
    logger.warn('⚠ OTP/Email: ' + (options.subject || 'unknown subject'));
    return { success: true, messageId: 'disabled' };
  }
};

module.exports = transporter;