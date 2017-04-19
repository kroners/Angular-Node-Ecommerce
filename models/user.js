'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

var userSchema = new Schema({
  username: {type: String, unique: true, lowercase: true},
  password: {type: String},
  name: String,
  lastName: String,
  lastLogin: Date,
  signUpDate: Date
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(11), null);
};

userSchema.methods.validPassword = function(passwordDB, password){
  return bcrypt.compareSync(password, passwordDB)
}

module.exports = mongoose.model('User', userSchema);
