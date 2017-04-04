'use strict'

const User = require('../models/user')
const mongodb = require('mongodb')
const bcrypt = require('bcrypt')


function crearUsuario(req, res){
  console.log('Llego a crear usuario')
  var passwordfe = req.body.pass
  var userfe = req.body.user
  var nombrefe = req. body.nombre
  var UserDB = new User();
  /*Verificar si usuario no existe en BD  y luego graba*/
  console.log('Buscar usuario existente')
  User.findOne({user: {$regex: userfe, $options: "i"}}, function(err, user){
    if (err){
      console.log('error tal')
      res.status(500).send(err)
    }else  if (user){
      console.log('Usuario ya esta en uso')
      res.status(401).send({message: `Error al crear usuario, usuario ya existe` })
    }else{
      console.log('no existe usuario, continua OK')
      var salt = bcrypt.genSaltSync(11)
      var hash = bcrypt.hashSync(passwordfe, salt)
      /*llenar UserDB*/
      UserDB.user = userfe
      UserDB.pass = hash
      UserDB.nombre = nombrefe
      console.log('datos de usuario a crear:[' +UserDB + ']')
      UserDB.save(function(err){
        if(err){
          res.status(500).send({message: `Error al crear usuario: ${err}`})
        }
        res.status(200).send({message: `Usuario creado OK`})
      })
    }
  });
  /*Fin*/


}

module.exports = {
  crearUsuario
}
