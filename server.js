var bodyParser =  require('body-parser');
var express = require('express');
var app =  express();
var mongoose =  require('mongoose');
var User = require('./models/user');
var Product =  require('./models/product');
var port = 3000;

//Configure app for bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Conexion a BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ecommerce');

/*Usuarios*/
app.get('/',function(req, res){
  //res.send('Hello World');
  res.sendFile(__dirname + '/index.html');
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

/*Productos*/
app.post('/guardaProductos', function(req, res){
  var product = new Product();
  product.codProd = req.body.codProd;
  product.name = req.body.name;
  product.desc = req.body.desc;
  product.stock = req.body.stock;
  product.save(function(err){
    if(err){
      res.send(err);
    }
    res.json({message: 'producto guardado'});
  });
});
app.post('/buscarProductos', function(req, res){
  //$regex --> busca palabra que tenga x valor
  //$options --> IN Case Sensitive
  Product.find({name:  {$regex: req.body.name.trim(), $options:"i" }}, function(err, product){
			if(err){
				res.send(err);
			}
			res.json(product);
		});

});
app.post('/actualizarStock', function(req, res){
  console.log('Actualizando stock de:[' + req.body.codProd.trim() + '] stock:['+ req.body.stock + ']');
    Product.updateOne(
      //{"codProd" : "abc002"},
      //{$set: {"stock" : 7755}}, function(err, product){
      {"codProd" : req.body.codProd.trim()},
      {$set: {"stock" : req.body.stock}}, function(err, product){
    			if(err){
    				res.send(err);
    			}
          res.send('Stock actualizado');
    		}
    );
});
app.post('/eliminarProducto', function(req, res){
  console.log('Eliminar producto con codigo:['+ req.body.codProd +']');
  Product.deleteOne(
    {"codProd" : req.body.codProd.trim()}, function(err, product){
        if(err){
          res.send(err);
        }
        res.send('Producto eliminado');
      }
  );
});


app.listen(port, function(){
  console.log('Server started on port: ' + port);
});


/**
switch statusCode{
 .case 200: print("exito")
 .case 401: print("no estas autorizado")
 .case 404: print("no encuentro lo que buscas")
 .case 500: print("mi server ta cagado")
 **/
