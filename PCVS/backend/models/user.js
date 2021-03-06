const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  userID: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true,unique:true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  acctype: {type: String, required: true},

  centreID: {type: String, required: false},
  staffID: {type: String, required: false},

  ID: {type: String, required: false},
  IDtype: {type: String, required: false},
  IDno: {type: String, required: false},
  phone: {type: Number, required: false},
  first: {type: String, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);
