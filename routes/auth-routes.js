'use strict'
/*Archivo a modificar para funcionalidad de productos*/
const userControllers = require('../controllers/user')

module.exports = function(app){
  app.get('/horalocal', function(req, res){
    var horalocal= userControllers.actualizarLastLogin('usuariox')
    res.send({message: 'La hora en la consola app externo  Hora:[' + horalocal + ']'})
  })
  //Ruta para cambio de contraseña
  app.post('/auth/cambiopassword', function(req, res){
    var sess
    sess = req.session
    userControllers.cambiarPassword(req,res, sess)
  })
  //Llamar a metodo recuperar Contrasena
  app.post('/auth/recuperarpassword', function(req, res){
    userControllers.recuperarPassword(req, res)
  })
  //GET para verificar si tiene token para resetear password
  app.get('/auth/reset/:token', function(req, res){
    userControllers.verificarTokenParaResetearPassword(req, res)
  })
  //POST para recuperar password
  app.post('/auth/reset/:token', function(req, res){
    userControllers.validarTokenRestablecerPassword(req,res)
  })

}
