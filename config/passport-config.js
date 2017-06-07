'use strict'

var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
var Employee = require('../models/employee')
var userControllers = require('../controllers/user')
var employeeControllers = require('../controllers/employee')
var momenttz = require('moment-timezone')
const configfile = require('./config-file')

module.exports = function(passport){

  passport.serializeUser(function(user, done){
    done(null, user.username)
  });

  passport.deserializeUser(function(username, done){
    User.findOne({username: username}, function(err, user){
      done(err, user)
    })
  });
/*Configuracion para signUp*/
passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true},
    function(req, username, password, done){
      console.log('Entro al USE - Local SignUP')
      username = req.body.username.toLowerCase().trim()
      password = req.body.password.trim()
      var passwordconfirm = req.body.confirmPassword.trim()
      if (password !== passwordconfirm) {
        console.log('*******************Error********************');
        console.log('Contraseñas no coinciden');

        return done( Error('Contraseñas no coinciden'), false, {codErr: '403', descerror: 'Contraseñas no coinciden'})
      }
      var name = req.body.name
      var lastName = req.body.lastName
      console.log('User: ['+ username+ '], Pass: ['+ password+ '], Name: ['+ name +'], Lastname: ['+ lastName +']')
      process.nextTick(function(){
        User.findOne({username: {$regex: username, $options: "i"}}, function(err, user){
          console.log('Busca si existe o no usuario')
          if(err){
            //return done(err)
            return done(err, false, {codErr: '500', descerror: err})
          }
          if(user){
            return done(null, false, {codErr: '401', descerror: 'El usuario ya esta en uso'})
          }else{
            console.log('Usuario disponible');
          try{
            var hora = momenttz().tz(configfile.server_time_zone).format()
            var newUser = new User()
            newUser.username = username
            newUser.password = newUser.generateHash(password)
            newUser.name = name
            newUser.lastName = lastName
            newUser.lastLogin = null
            newUser.signUpDate = hora
            newUser.save(function(err){
              console.log('grabando usuario');
              if(err){
                throw err;
                //return(null, err)
              }

              return done(null, newUser, {
                username: newUser.username,
                name: newUser.name,
                lastName: newUser.lastName,
                lastLogin: newUser.lastLogin
              })
              /* {codErr: '200', descerror: 'Creacion de usuari OK en BD'})*/
            })
          }catch(err){
            console.log('Error : ************' + err)
            return done(err, null,{codErr: '500', descerror: err})
          }
          }
        })
      })
    }
  ));
/*Configuracion para Login*/
passport.use('local-login', new LocalStrategy({
    passReqToCallback: true},
    function(req, username, password, done){
      console.log('Entro al USE - Local Login')
      var sess;
      sess = req.session;
      username = req.body.username.toLowerCase().trim()
      password = req.body.password.trim()

      console.log('IN --> User: ['+ username+ '], Pass: ['+ password+ ']')
      process.nextTick(function(){
        User.findOne({username: username}, function(err, user){
          if(user){
            console.log('OUT DATA FROM DATABASE')
            console.log('--USER-------->' + user.username + '<-------------')
            console.log('--PASS-------->' + user.password + '<-------------')
            console.log('--NAME-------->' + user.name + '<-------------')
            console.log('--LASTLOGIN-------->' + user.lastLogin + '<-------------')
          }
          if(err){
            console.log('Error general - Login - ' + err)
            return done(err, false, {codErr: '500', descerror: err})
            //return done(err)
          }
          if(!user){
            console.log('Error - El usuario no existe');
            return done(null, false, {codErr: '401', descerror: 'El usuario no existe'})
          }
          //var newUser = new User()
          if(!user.validPassword(user.password, password)){
            console.log('Error - Clave incorrecta')
            return done(null, false, {codErr: '403', descerror: 'Clave incorrecta'})
          }
          console.log('Login OK nombre de usuario: [' + user.name + ' '+ user.lastName +']')
          //Actualizar fecha de lastLogin
          userControllers.actualizarLastLogin(user.username)
          sess.user = user
          var fechalastlogin = momenttz(user.lastLogin).format('LTS - DD/MM/YYYY')
          var info= {username: user.username,
            name: user.name,
            lastName: user.lastName,
            lastLogin: fechalastlogin
          }
          console.log('-------> Esto debe devolver al front-->');
          console.log(info);
          return done(null, user, info)/*aca faltaria regresar datos de info*/
        })
      })
    }
  ));


  /*Configuracion para Login de Admin y employees*/
  passport.use('local-login-adm', new LocalStrategy({
      passReqToCallback: true},
      function(req, username, password, done){
        console.log('Entro al USE - Local Login del Admin')
        var sess;
        sess = req.session;
        username = req.body.username.toLowerCase().trim()
        password = req.body.password.trim()

        console.log('IN --> User: ['+ username+ '], Pass: ['+ password+ ']')
        process.nextTick(function(){
          Employee.findOne({username: username}, function(err, employee){
            if(employee){
              console.log('OUT DATA FROM DATABASE Admin')
              console.log('--USER-------->' + employee.username + '<-------------')
              console.log('--PASS-------->' + employee.password + '<-------------')
              console.log('--NAME-------->' + employee.name + '<-------------')
              console.log('--LASTLOGIN-------->' + employee.lastLogin + '<-------------')
            }
            if(err){
              console.log('Error general - Login Admin - ' + err)
              return done(err, false, {codErr: '500', descerror: err})
              //return done(err)
            }
            if(!employee){
              console.log('Error - El usuario no existe');
              return done(null, false, {codErr: '401', descerror: 'El usuario no existe'})
            }
            if(!employee.validPassword(employee.password, password)){
              console.log('Error - Clave incorrecta')
              return done(null, false, {codErr: '403', descerror: 'Clave incorrecta'})
            }
            console.log('Login OK nombre de usuario: [' + employee.name + ' '+ employee.lastName +']')
            //Actualizar fecha de lastLogin
            employeeControllers.actualizarLastLogin(employee.username)
            //sess.user = u
            var fechalastlogin = momenttz(employee.lastLogin).format('LTS - DD/MM/YYYY')
            var info= {username: employee.username,
              name: employee.name,
              lastName: employee.lastName,
              lastLogin: fechalastlogin
            }
            console.log('-------> Esto debe devolver al front-->');
            console.log(info);
            return done(null, employee, info)/*aca faltaria regresar datos de info*/
          })
        })
      }
    ));

    /*Configuracion para signUp de nuevos trabajadores*/
    passport.use('local-signup-adm', new LocalStrategy({
        passReqToCallback: true},
        function(req, username, password, done){
          console.log('Entro al USE - Local SignUP')
          username = req.body.username.toLowerCase().trim()
          password = req.body.password.trim()
          var passwordconfirm = req.body.confirmPassword.trim()
          if (password !== passwordconfirm) {
            console.log('*******************Error********************');
            console.log('Contraseñas no coinciden');

            return done( Error('Contraseñas no coinciden'), false, {codErr: '403', descerror: 'Contraseñas no coinciden'})
          }
          var name = req.body.name
          var lastName = req.body.lastName
          console.log('Employee: ['+ username+ '], Pass: ['+ password+ '], Name: ['+ name +'], Lastname: ['+ lastName +']')
          process.nextTick(function(){
            Employee.findOne({username: {$regex: username, $options: "i"}}, function(err, employee){
              console.log('Busca si existe o no usuario')
              if(err){
                //return done(err)
                return done(err, false, {codErr: '500', descerror: err})
              }
              if(employee){
                return done(null, false, {codErr: '401', descerror: 'El usuario ya esta en uso'})
              }else{
                console.log('Usuario disponible');
              try{
                var hora = momenttz().tz(configfile.server_time_zone).format()
                var newEmployee = new Employee()
                newEmployee.username = username
                newEmployee.password = newEmployee.generateHash(password)
                newEmployee.name = name
                newEmployee.lastName = lastName
                newEmployee.lastLogin = null
                newEmployee.signUpDate = hora
                newEmployee.save(function(err){
                  console.log('grabando usuario admin');
                  if(err){
                    throw err;
                    //return(null, err)
                  }

                  return done(null, newEmployee, {
                    username: newEmployee.username,
                    name: newEmployee.name,
                    lastName: newEmployee.lastName,
                    lastLogin: newEmployee.lastLogin
                  })
                  /* {codErr: '200', descerror: 'Creacion de usuari OK en BD'})*/
                })
              }catch(err){
                console.log('Error : ************' + err)
                return done(err, null,{codErr: '500', descerror: err})
              }
              }
            })
          })
        }
      ));

}
