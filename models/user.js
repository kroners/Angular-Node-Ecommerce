var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user:String,
  pass: String
});

module.exports = mongoose.model('User', userSchema);
