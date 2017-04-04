'use strict'

const express = require('express')
const productControllers = require('../controllers/product')
const userControllers = require('../controllers/user')
const api = express.Router()

const auth = require('../middleware/auth')
var passport = require('passport')


/*Productos*/
api.post('/guardaProductos', productControllers.guardarProductos)
api.get('/buscarProductos/:nombre', productControllers.buscarProductos)
api.get('/listarProductos', productControllers.listarProductos)
api.put('/actualizarStock/:codProd/:stock', productControllers.actualizarStock)
api.delete('/eliminarProducto/:codProd', productControllers.eliminarProducto)
api.delete('/eliminarProductID/:_id', productControllers.eliminarProductID)

/*Usuario*/
api.post('/crearUsuario', userControllers.crearUsuario)

api.post('/login', passport.authenticate('local-login', {
    successRedirect : '/loginOK', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
}));

api.get('/login', function(req, res){
  res.send({message: 'Pagina de login - Error'})
})
api.get('/loginOK', function(req, res){
  res.send({message: 'Pagina de login - OK'})
})

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
