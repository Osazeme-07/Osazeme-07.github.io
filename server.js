const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('docs'));

// Serve the main HTML file on the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/docs/index.html');
});

// Handling form submission
app.post('/send-email', (req, res) => {
    const { 'first-name': firstName, 'last-name': lastName, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.RECEIVING_EMAIL,
        subject: `New contact form submission from ${firstName} ${lastName}`,
        text: `You have received a new message from ${firstName} ${lastName} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('An error occurred while sending the email.');
        }
        res.status(200).send('Email sent successfully!');
    });
});
