'use strict'

var LocalStrategy = require('passport-local').Strategy

var User = require('./models/user')

module.exports = function(passport){

  passport.serializeUser(function(user, done){
    done(null, user.email)
  })

  passport.deserializeUser(function(user, done){
    User.findOne({user: user}, function(err, user){
      done(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, function(req, email, password, done){
    User.findOne({user: email}, function(err, user){
      if(err){ return done(err)}

      if(!user){
        return done(null, false)
      }
      if(!user.validPassword(password)){
        return done(null, false)
      }
      return done(null, user)

    })
  }
    ))
}
