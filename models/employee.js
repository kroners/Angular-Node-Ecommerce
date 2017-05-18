'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

var employeeSchema = new Schema({
  username: {type: String, unique: true, lowercase: true},
  password: {type: String},
  name: String,
  lastName: String,
  lastLogin: Date,
  signUpDate: Date,
  profileType: String,
  role: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date

});

employeeSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

employeeSchema.methods.validPassword = function(passwordDB, password){
  return bcrypt.compareSync(password, passwordDB)
}

module.exports = mongoose.model('Employee', employeeSchema);
