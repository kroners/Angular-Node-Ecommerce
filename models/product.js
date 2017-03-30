'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  codProd:String,
  name: String,
  desc: String,
  stock: Number
});

module.exports = mongoose.model('Product', productSchema);
