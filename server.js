const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // Setup nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com', // replace with your email
            pass: 'your-email-password' // replace with your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com', // replace with your email
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission:\n\n
            First Name: ${firstName}\n
            Last Name: ${lastName}\n
            Email: ${email}\n
            Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.json({ success: false });
        }
        console.log('Email sent: ' + info.response);
        res.json({ success: true });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
