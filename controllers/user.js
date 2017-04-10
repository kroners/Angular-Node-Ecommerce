'use strict'

const User = require('../models/user')
const bcrypt = require('bcrypt')
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

module.exports = {
  actualizarLastLogin
}
