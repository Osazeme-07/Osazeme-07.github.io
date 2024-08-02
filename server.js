require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Use environment variable PORT or default to 3000 locally
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVING_EMAIL || 'theglobalresearchhubuk@gmail.com',
    subject: `New contact form submission from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('An error occurred while sending the email.');
    }
    res.status(200).send('Email sent successfully!');
  });
});

// Listen on the correct port
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
