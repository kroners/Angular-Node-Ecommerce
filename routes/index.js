'use strict'

const express = require('express')
const productControllers = require('../controllers/product')
const userControllers = require('../controllers/user')
const api = express.Router()

const auth = require('../middleware/auth')


/*Productos*/
api.post('/guardaProductos', productControllers.guardarProductos)
api.get('/buscarProductos/:nombre', productControllers.buscarProductos)
api.get('/listarProductos', productControllers.listarProductos)
api.put('/actualizarStock/:codProd/:stock', productControllers.actualizarStock)
api.delete('/eliminarProducto/:codProd', productControllers.eliminarProducto)
api.delete('/eliminarProductID/:_id', productControllers.eliminarProductID)

/*Usuario*/
api.post('/crearUsuario', userControllers.crearUsuario)

/*
api.get('/private', auth.isAuth , function(req, res){

  res.status(200).send({message: 'Ingreso OK'})
  }
)
*/
/*
api.get('/private', auth.isAuth, function(req, res){
  res.status(200).send({message: 'Acceso Ok'})
})
*/

module.exports = api 
