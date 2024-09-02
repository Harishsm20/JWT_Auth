const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_User,
    pass: process.env.EMAIL_PASSWORD, // Replace with your Gmail password
  },
});

// Set email options
const mailOptions = {
  from: process.env.EMAIL_User,
  to: 'test@gmail.com',
  subject: 'Test Email from Node.js',
  text: 'Hello! This is a test email sent using Nodemailer.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error: ' + error);
  }
  console.log('Email sent: ' + info.response);
});
