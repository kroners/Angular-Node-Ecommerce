'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
var momenttz = require('moment-timezone');
var nodemailer =  require('nodemailer')
var configfile = require('../config/config-file')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth : {
    user: configfile.emailUser,
    pass: configfile.mailPassword
  }
})
var domainName = configfile.domainName

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

function cambiarPassword(req,res, sess){
  var userSession = new User()
  //var userSession = sess.user
  try{
    userSession.username = sess.user.username
    userSession.password = sess.user.password
  }catch(err){
    res.status(500).send({codErr: 500, descerror: err})
  }

  var username = userSession.username
  var password = req.body.password.trim()
  var newpassword = req.body.newpassword.trim()
  var newpassword1 = req.body.newpassword1.trim()
  var hash
  //Verificar password actualizarLastLogin
  if(!userSession.validPassword(userSession.password, password)){
    console.log('-----------> Error: Contrasena incorrecta')
    res.status(401).send({codErr: '401', descerror: 'Error: Contrasena incorrecta'})
  }
  //Verificar que nuevas contrasena sean iguales
  if(newpassword !== newpassword1){
    console.log('-----------> Error: Contrasenas nuevas no coinciden')
    res.status(401).send({codErr: '401', descerror: 'Error: Contrasenas nuevas no coinciden'})
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
          res.status(401).send({codErr: '401', descerror: err})
        }
      }

  )
  res.status(200).send({codErr: '200', descerror: 'Cambio de contrasenas OK'})
}

function recuperarPassword(req,res){
  var username = req.body.username.toLowerCase().trim();
    User.findOne({username: {$regex: username, $options: "i"}}).then(function(user){
      console.log('------>user:-->'+ user + '<-----' );
      if (user) {
        console.log('Encontro a usuario')
        sendResetPasswordEmail(req, res, user.username)
      }else{
          console.log('Usuario no existe')
          res.status(401).send({codErr: '401', descerror: 'El usuario no existe'})
      }
    })
}

function sendResetPasswordEmail(req, res, username){
  var mailOptions = {
    from: '"Le Drug Store" <' + configfile.emailUser + '>', // sender address
    to: 'temporal@mail.com', // list of receivers
    subject: 'Recuperar contraseña', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<div style="background: black;width:500px;margin:0px auto;margin-top:10px;margin-bottom:40px;padding:40px;font-style:tahoma"><p style="text-align:center;color:white;font-size:15px">To reset your password, please click on the button below, or click the following link if the button does not work.</p><br><br>'+
                '<a style="text-decoration:none;margin-left:36%;background:rgb(25, 176, 153);padding:20px;width:200px;border:none;color:white;font-style:bold;font-size:20px" href="http://localhost:8000/#/resetPassword/">Reset Password</a></div><br>'+
                'http://localhost:8000/#/resetPassword/' // html bod
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});

  res.status(200).send(username)
}

module.exports = {
  actualizarLastLogin,
  cambiarPassword,
  recuperarPassword
}
