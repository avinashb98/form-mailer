const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const connectionURL = 'mongodb://avinashb98:openddoor@ds141028.mlab.com:41028/contact-form'
mongoose.connect(connectionURL, () => {
  console.log('Connected to database...');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'avitest98@gmail.com',
        pass: 'openddoor'
    }
});

app.get('/', (req, res) => {
  res.send({
    message: 'Successful'
  });
});

app.post('/', (req, res) => {
  let mailHTML = `<h3>${req.body.name} submitted the contact us form and here are the details.</h3>`;
  for(key in req.body) {
    mailHTML += `<br><p>${key}: ${req.body[key]}</p>`
  }
  const mailOptions = {
    from: 'avitest98@gmail.com',
    to: 'avinashb97@gmail.com',
    subject: 'Nodemailer Test',
    html: mailHTML
  };

  transporter.sendMail(mailOptions, function (err, info) {
     if(err) {
       console.log(err);
       res.status(400).send({
         message: 'error occurred'
       });
     }
     else {
       res.status(200).send({
         message: 'Success'
       });
     }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
