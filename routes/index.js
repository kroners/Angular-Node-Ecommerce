'use strict'

module.exports = function(app, passport){
  // app.get('/', function(req, res){
  //   res.send({message: 'Pagina de inicio para login y signup'})
  // });

  // app.get('/login', function(req, res){
  //   res.send({message: 'Pagina de Login'})
  // });

  // app.get('/signup', function(req, res){
  //   res.send({message: 'Pagina de registro - sign up'})
  // });
/*
  app.get('/profile', function(req, res){
    //res.send({message: 'Perfil de usuario - Login OK', status: "SUCCESS"});
    res.status(200).send({message: 'Perfil de usuario - Login OK' })
  });
*/
  app.post('/signup', function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info){
      console.log('--->User : ' + user);
      console.log('--->Info : ' + info);
      console.log('--->Err  : ' + err);
      if(err){
          console.log(err);
          return res.status(500).send(info)
      }
      if(user == false){
        return res.status(401).send(info)
      }

      req.logIn(user, function(err){
        if(err){return next(err)}
        //return res.redirect('/profile')
          return res.status(200).send(info);
      })
    })(req, res, next);
  })

  app.post('/login', function(req, res, next){
    passport.authenticate('local-login', function(err, user, info){
      if(err){return res.status(500).send(info)}
      if(user == false){return res.status(401).send(info)}
      req.logIn(user, function(err){
        if(err){return res.status(500).send({codErr:'500', descerror: err})}
        return res.redirect('/loginOK')
      })
    })(req, res, next);
  })

  app.get('/loginOK', function(req, res){
    res.send({message: 'Pagina de login - OK'})
  });

}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

/*
const express = require('express')
const productControllers = require('../controllers/product')
const userControllers = require('../controllers/user')
const api = express.Router()

const auth = require('../middleware/auth')
var passport = require('passport')


///Productos
api.post('/guardaProductos', productControllers.guardarProductos)
api.get('/buscarProductos/:nombre', productControllers.buscarProductos)
api.get('/listarProductos', productControllers.listarProductos)
api.put('/actualizarStock/:codProd/:stock', productControllers.actualizarStock)
api.delete('/eliminarProducto/:codProd', productControllers.eliminarProducto)
api.delete('/eliminarProductID/:_id', productControllers.eliminarProductID)

module.exports = api
*/
