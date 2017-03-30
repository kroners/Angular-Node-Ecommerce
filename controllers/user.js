'use strict'

const User = require('../models/user')
const mongodb = require('mongodb')
const bcrypt= require('bcrypt')


function crearUsuario(req, res){
  console.log('Llego a crear usuario')
  var password = req.body.pass
  console.log('password: [' + password + ']')
  var salt = bcrypt.genSaltSync(10)
  //var password = req.body.pass
  var hash = bcrypt.hashSync(password, salt)
  console.log('password: [' + password + ']')
  console.log('salt: [' + salt + ']')
  console.log('hash: [' + hash + ']')
  res.send({message: 'usuario creado'})

  /*
  var usuario = new User();
  usuario.user = req.body.user,
  usuario.nombre = req.body.nombre
  */
}

module.exports = {
  crearUsuario
}
