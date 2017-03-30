'use strict'

const Product =  require('../models/product')
const mongodb =  require('mongodb')

function guardarProductos(req, res){
  console.log('llego a funct guardarproducto')
  var product = new Product();
  product.codProd = req.body.codProd;
  product.name = req.body.name;
  product.desc = req.body.desc;
  product.stock = req.body.stock;
  product.save(function(err){
    if(err){
      res.status(500).send(err);
    }
    res.status(200).send({message: 'producto guardado'});
  });
}

function buscarProductos(req, res){
  //$regex --> busca palabra que tenga x valor
  //$options --> IN Case Sensitive
  var nombre= req.params.nombre
  console.log('nombre a buscar [' + nombre+ ']')
  Product.find({name:  {$regex: nombre.trim(), $options:"i" }}, function(err, product){
      if(err){
        res.status(500).send(err);
      }
      res.status(200).send(product);
    });
}

function listarProductos(req, res){
  Product.find({}, function(err, product){
      if(err){
        res.status(500).send(err);
      }
      res.status(200).send(product);
    });
}

function actualizarStock(req, res){
  var codProd = req.params.codProd.trim()
  var stock = req.params.stock
  console.log('Actualizando stock de:[' + codProd + '] stock:['+ stock + ']');
    Product.updateOne(
      {"codProd" : codProd},
      {$set: {"stock" : stock}}, function(err, product){
          if(err){
            res.status(500).send(err);
          }
          res.status(200).send('Stock actualizado');
        }
    );
}

function eliminarProducto(req, res){
  var codProd = req.params.codProd.trim()
  console.log('Eliminar producto con codigo:['+ codProd +']');

  Product.find({codProd: codProd})

  Product.remove(
    {"codProd" : codProd}, function(err, product){
        if(err){
          res.status(500).send(err);
        }
        res.status(200).send('Producto eliminado');
      }
  );
}
function eliminarProductID(req, res){
  var _id = req.params._id.trim()
  console.log('Eliminar producto con id:['+ _id +']');

  Product.find({_id: _id})

  Product.remove(
    {"_id" : new mongodb.ObjectID(_id)}, function(err, product){
        if(err){
          res.status(500).send(err);
        }
        res.status(200).send('Producto eliminado');
      }
  );
}

module.exports= {
  guardarProductos,
  buscarProductos,
  listarProductos,
  actualizarStock,
  eliminarProducto,
  eliminarProductID
}
