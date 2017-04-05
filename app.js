'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app =  express()
const api = require('./routes/index')
const passport = require('passport')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

// Añadiendo cabeceras para permitir acceso y conexion por lado de front End
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

// llamamos el modulo de path y hacemos el vinculo para visualizar lado Front End
const path = require('path')
// set the public folder. we can put in there stylesheets etc
app.use(express.static(path.join(__dirname, './client')))

app.use('/api', api)

module.exports = app
