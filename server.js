'use strict'

const mongoose =  require('mongoose')
const app = require('./app')
const config =  require('./config/config-file')

//const api = require('./routes/index')

//Conexion a BD
mongoose.Promise = global.Promise
mongoose.connect(config.db, (err, res)=>{
  if(err){
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  app.listen(config.port, function(){
    console.log(`API rest de ecommerce corriendo en http://localhost:${config.port}`)
  });
})
