'use strict'
const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp(req, res){
  const user = new User({
    user: req.body.user,
    nombre: req.body.nombre
  })
  user.save(function(){
    if(err){
       res.status(500).send({message: `Error al crear usuario: ${err}`})
    }
    return res.status(200).send({token: service.createToken(user)})

  })
}

function signIn(req, res){

}

module.export = {
  signIn,
  signUp
}
