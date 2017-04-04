'use strict'

const mongoose =  require('mongoose')
const app = require('./app')
const config =  require('./config')
//const api = require('./routes/index')

//const User = require('./models/user');
//const Product =  require('./models/product');

//Conexion a BD
mongoose.connect(config.db, (err, res)=>{
  if(err){
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  app.listen(config.port, function(){
    console.log(`API rest de ecommerce corriendo en http://localhost:${config.port}`)
  });
})



/*Usuarios*/
/*app.get('/',function(req, res){
  //res.send('Hello World');
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  res.sendFile(__dirname + 'client/index.html');
});

app.post('/send', function(req, res){
  var user = new User();
  user.user = req.body.user;
  user.pass = req.body.pass;
  user.save(function(err){
    if(err){
      res.send(err);
    }
    res.json({message: 'usuario creado'});
  });
});
*/

/**
switch statusCode{
 .case 200: print("exito")
 .case 401: print("no estas autorizado")
 .case 404: print("no encuentro lo que buscas")
 .case 500: print("mi server ta cagado")
 **/
