var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  codProd:String,
  name: String,
  desc: String,
  stock: Number
});

module.exports = mongoose.model('Product', productSchema);
