module.exports={
  port: process.env.PORT || 4000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/ecommerce2',
  SECRET_TOKEN: 'claveTokenEcommerce'
}
