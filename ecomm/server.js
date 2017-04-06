'use strict'
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const configfile = require('./config/configfile')
var passport = require('passport')
var bodyParser = require('body-parser')
var session = require('session')
//var morgan = require('morgan')
/*Configuracion de passport; para login - signUp*/
require('./config/passport-config')(passport)

//app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

/*Rutas*/
require('./routes/routes.js')(app, passport)




//Conexion a BD
mongoose.connect(configfile.db, (err, res)=>{
  if(err){
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  app.listen(configfile.port, function(){
    console.log(`API rest de ecommerce corriendo en http://localhost:${configfile.port}`)
  })
})
