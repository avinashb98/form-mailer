const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');

const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'avitest98.com',
        pass: 'openddoor'
    }
});

const mailOptions = {
  from: 'avitest98@gmail.com', // sender address
  to: 'avinashb97@gmail.com', // list of receivers
  subject: 'Nodemailer Test', // Subject line
  html: '<h1>Yaay!! Success</h1>'// plain text body
};

// transporter.sendMail(mailOptions, function (err, info) {
//    if(err)
//      console.log(err)
//    else
//      console.log(info);
// });

app.use(cors());

app.get('/', (req, res) => {
  res.send({
    message: 'Successful'
  });
});



app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
