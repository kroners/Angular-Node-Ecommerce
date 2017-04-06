'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app =  express()

const passport = require('passport')

require('./passporting')(passport)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// se añaden las cabeceras en back para permitir acceso desde front end.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.use(passport.initialize())
app.use(passport.session())

const path = require('path')
// set the public folder. we can put in there stylesheets etc
app.use(express.static(path.join(__dirname, './client')))

const api = require('./routes/index')(app,passport)
app.use('/api', api)

module.exports = app
