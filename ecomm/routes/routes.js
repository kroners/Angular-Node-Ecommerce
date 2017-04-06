'use strict'

module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.send({message: 'Pagina de inicio para login y signup'})
  });

  app.get('/login', function(req, res){
    res.send({message: 'Pagina de Login'})
  });

  app.get('/signup', function(req, res){
    res.send({message: 'Pagina de registro - sign up'})
  });

  app.post('/signup',
    passport.authenticate('local-signup', {
      succesRedirect: '/profile',
      failureRedirect: '/signup'
  }));

  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/loginOK', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
  }));

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
