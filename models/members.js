const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  slogan: {
    type: String,
    required: true
  },
  startdate: {
    type: String,
    required: true
  }
}, 
{ timestamps: true });

const Members = mongoose.model('Members', memberSchema);
module.exports = Members;