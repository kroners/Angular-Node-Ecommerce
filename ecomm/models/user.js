'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

var userSchema = new Schema({
  username: {type: String, unique: true, lowercase: true},
  password: {type: String, select: false},
  name: String,
  lastlogin: Date
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(11), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema);
