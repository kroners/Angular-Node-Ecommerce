'use strict'

var LocalStrategy = require('passport-local').Strategy
var User = require('./models/user')

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
      username = req.body.username
      password = req.body.password
      var name = req.body.name
      console.log('User: ['+ username+ '], Pass: ['+ password+ '], Name: ['+ name +']')
      process.nextTick(function(){
        User.findOne({username: {$regex: username, $options: "i"}}, function(err, user){
          if(err){
            return done(err)
          }
          if(user){
            console.log('Error - El usuario ya esta en uso');
            return done(null, false, {message: 'Error - El usuario ya esta en uso'})
          }else{
            var newUser = new User()
            newUser.username = username
            newUser.password = newUser.generateHash(password)
            newUser.name = name

            newUser.save(function(err){
              if(err){throw err}
              return done(null, newUser)
            })
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
      username = req.body.username
      password = req.body.password
      console.log('IN --> User: ['+ username+ '], Pass: ['+ password+ ']')
      process.nextTick(function(){
        User.findOne({username: {$regex: username, $options: "i"}}, function(err, user){
          if(user){
            console.log('OUT DATA FROM DATABASE')
            console.log('---------->' + user.username + '<-------------')
            console.log('---------->' + user.password + '<-------------')
            console.log('---------->' + user.name + '<-------------')
          }
          if(err){
            console.log('Error general - Login - ' + err)
            return done(err)
          }
          if(!user){
            console.log('Error - El usuario no existe');
            return done(null, false, {message: 'Error - El usuario no existe'})
          }
          //var newUser = new User()
          if(!user.validPassword(user.password, password)){
            console.log('Error - Clave incorrecta')
            return done(null, false, {message: 'Error - Clave incorrecta'})
          }
          console.log('Login OK nombre de usuario: [' + user.name +']')
          return done(null, user)
        })
      })
    }
  ));




}
