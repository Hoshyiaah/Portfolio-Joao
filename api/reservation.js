const express = require('express');
const app = express();
const mysql = require('mysql2');
const router = express.Router();
const cors = require('cors');
app.use(cors());
const nodemailer = require('nodemailer');

const connexion = mysql.createConnection({
    host: 'localhost', //Server Name
    port: '3308', //Port
    user: 'root', //Database Server Username
    password: '', //Username Password
    database: 'portfolioex' //Database Name
})

connexion.connect((err) => {
    if (err) {
        console.error('Connection error :', err.stack);
        return;
    }
    console.log('Successful connection to the database.');
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //gmail servers, change it if you dont use gmail
    port: 587,
    secure: false,
    auth: {
        user: 'test7306788@gmail.com', // Your Email
        pass: 'rdgg mwlh krjv phsb' // Your App Password
    },
    logger: true
    });

router.post('/', (req, res) => {
    const { firstName, lastName, email, startDate, endDate, people } = req.body;

    if (!firstName || !lastName || !email || !startDate || !endDate || !people) {
        return res.status(400).json({ message: 'All fields required.' });
    }

    const data = [firstName, lastName, email, startDate, endDate, people];

    const query = 'INSERT INTO reservations (firstName, lastName, email, startDate, endDate, people) VALUES (?, ?, ?, ?, ?, ?)';
    connexion.query(query, data, (err, result) => {
        if (err) {
            console.error('Error when inserting in database:', err);
            return res.status(500).json({ message: 'Server error. Try again later.' });
        }

        console.log('Reservation succeeded !');

        const clientMailOptions = {
            from: 'test7306788@gmail.com', // Admin Email
            to: email,
            subject: 'Reservation Confirmed',
            text: `Hello ${firstName} ${lastName},\n\nYour reservation has been confirmed\n\nReservation details:\nFrom: ${startDate}\nTo: ${endDate}\nPeople: ${people}\n\nThank you for choosing our services.`
        };

        const adminMailOptions = {
            from: 'test7306788@gmail.com', //Admin Email
            to: 'test7306788@gmail.com',  //Seller Email
            subject: 'New reservation',
            text: `New reservation from ${firstName} ${lastName}.\n\nDetails:\nEmail: ${email}\nFrom : ${startDate}\nTo: ${endDate}\nPeople: ${people}`
        };

        transporter.sendMail(clientMailOptions, (error, info) => {
            if (error) {
                console.error('Error while sending confirmation error to client', error);
            } else {
                console.log('Confirmation email sent to client', info.response);
            }

            transporter.sendMail(adminMailOptions, (error, info) => {
                if (error) {
                    console.error("Error while sending admin an email", error);
                } else {
                    console.log('Email sent to admin', info.response);
            res.status(201).json({ message: 'The reservation succeeded, a confirmation email was sent to you !' });
                }
            });
        });
    });
});

module.exports = router;