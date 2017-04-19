'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
var momenttz = require('moment-timezone');

function actualizarLastLogin(username){
  var hora = momenttz().tz("America/Lima").format()
    User.update(
      {username: username}, {$set: {
          lastLogin: hora
      }}, {
        upsert: false,
        multi: false
      }, function(err, affected){
        if(err){
          console.log(err)
          return false
        }
      }
    )
  return true
}

function cambiarPassword(req, sess){
  var userSession = new User()
  //var userSession = sess.user
  userSession.username = sess.user.username
  userSession.password = sess.user.password
  var username = userSession.username
  var password = req.body.password.trim()
  var newpassword = req.body.newpassword.trim()
  var newpassword1 = req.body.newpassword1.trim()
  var hash
  //Verificar password actualizarLastLogin
  if(!userSession.validPassword(userSession.password, password)){
    console.log('-----------> Error: Contrasena incorrecta')
    return 'Error: Contrasena incorrecta';
  }
  //Verificar que nuevas contrasena sean iguales
  if(newpassword !== newpassword1){
    console.log('-----------> Error: Contrasenas nuevas no coinciden')
    return 'Error: Contrasenas nuevas no coinciden';
  }
  //hash de nueva clave
  hash = userSession.generateHash(newpassword)

  console.log('User en cambiar Password:[' + username +']')
  console.log('-------> Pass Sess:[' + userSession.password + ']')
  console.log('-------> OldPass:  [' + password + ']')
  console.log('-------> newPass:  [' + newpassword + ']')
  console.log('-------> newPass1: [' + newpassword1 + ']')
  console.log('-------> newHash: [' + hash + ']')
  //actualizar nueva clave
  User.update(
    {username: username}, {$set:
      {password: hash}},
      {
          upsert: false,
          multi:false
      }, function(err, affected){
        if(err){
          console.log('--->Error - Error al actualizar clave en BD')
          return err
        }
      }

  )
  return 'Cambio de contrasenas OK'
}

module.exports = {
  actualizarLastLogin,
  cambiarPassword
}
