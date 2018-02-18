const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formDetailsSchema = new Schema({
  name: String,
  gender: String,
  ageGroup: String,
  deliveredBy: String,
  comfortability: String,
  otherSpecifications: String
});

const formDetails = mongoose.model('contactForm', formDetailsSchema);
module.exports = formDetails;
