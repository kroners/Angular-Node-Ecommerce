'use strict'

const Employee = require('../models/employee')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const async = require('async');
var momenttz = require('moment-timezone');

function actualizarLastLogin(username){
  var hora = momenttz().tz("America/Lima").format()
    Employee.update(
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
