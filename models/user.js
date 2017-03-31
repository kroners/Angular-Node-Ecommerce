'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*Libreria para encriptar contraseña*/
//const bcrypt = require('bcrypt-nodejs')
//const crypto = require('crypto')

var userSchema = new Schema({
  user: {type: String, unique: true, lowercase: true},
  pass: {type: String, select: false},
  nombre: String,
  /* PAUSA avatar: String,*/
  ultimaSesion: Date
});
/* en pausa para otro metodo
userSchema.pre('save', (next) => {
  let user = this
  if(!user.isModified('pass')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err)

    bcrypt.hash(user.pass, salt, null, (err, hash)=>{
      if (err) return next(err)

      user.pass = hash
      next()
    })
  })
})
*/
/*PAUSA
a partir de usuario devuelve avatar
userSchema.methods.gravatar = function(){
  if(!this.user) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.user).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}
*/
module.exports = mongoose.model('User', userSchema);
