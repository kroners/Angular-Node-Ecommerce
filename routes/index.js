'use strict'

const express = require('express')
const  productControllers = require('../controllers/product')
const api = express.Router()


/*Productos*/
api.post('/guardaProductos', productControllers.guardarProductos)
api.get('/buscarProductos/:nombre', productControllers.buscarProductos)
api.get('/listarProductos', productControllers.listarProductos)
api.put('/actualizarStock/:codProd/:stock', productControllers.actualizarStock)
api.delete('/eliminarProducto/:codProd', productControllers.eliminarProducto)
api.delete('/eliminarProductID/:_id', productControllers.eliminarProductID)

module.exports = api
