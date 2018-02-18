const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'avitest98@gmail.com',
        pass: 'openddoor'
    }
});

module.exports = transporter;
