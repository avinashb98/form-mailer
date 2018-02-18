const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mailTransporter = require('./config/nodemailer-config');
const contactForm =  require('./models/form-details');

//database connection
const connectionURL = 'mongodb://avinashb98:openddoor@ds141028.mlab.com:41028/contact-form'
mongoose.connect(connectionURL, () => {
  console.log('Connected to database...');
});

//middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'Contact form API'
  });
});

app.post('/', (req, res) => {
  let formDetails = {};
  for(key in req.body) {
    formDetails[key] = req.body[key];
  }

  contactForm.create(formDetails, (err, newFormDetails) => {
    if(err) {
      res.status(403).send(err);
    } else {

      let mailHTML = `<h3>${req.body.name?req.body.name: 'A new User'} submitted the contact us form and here are the details.</h3>`;

      for(key in req.body) {
        mailHTML += `<br><p>${key}: ${req.body[key]}</p>`
      }

      const mailOptions = {
        from: 'avitest98@gmail.com',
        to: 'avinashb97@gmail.com',
        subject: 'Contact Form Details',
        html: mailHTML
      };

      mailTransporter.sendMail(mailOptions, function (err, info) {
         if(err) {
           console.log(err);
           res.status(400).send(err);
         }
         else {
           res.status(200).send({
             message: 'Form Submitted'
           });
         }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
