require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('docs'));

// Serve the main HTML file on the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/docs/index.html');
});

app.use(cors());

// Handling form submission
app.post('/send-email', (req, res) => {
    const { 'first-name': firstName, 'last-name': lastName, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        port: 587,
        auth: {
            user: process.env.MAILJET_API_KEY,
            pass: process.env.MAILJET_API_SECRET
        }
    });

    const mailOptions = {
        from: "osazemeogbeide1@gmail.com",
        to: 'theglobalresearchhubuk@gmail.com',
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
