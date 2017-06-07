module.exports={
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/ecommerce',
  SECRET_TOKEN: 'claveTokenEcommerce',
  server_time_zone: 'America/Lima',
  secret_token_session: 'tokensession',
  emailUser: 'pryeba@gmail.com',
  emailPassword: 'rueba',
  domainName: 'http://localhost:3000/'
}
