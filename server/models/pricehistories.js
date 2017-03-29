var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pricehistoriesSchema = new Schema({
  ProductId: { type: String},
  Asin: { type: String,  required: true },
  ItemTitle: { type: String},
  // ProductId:{ type: String},
  Price: { type: String},
  _id:{ type: String},
  // ProductGroup:{ type: String,},
  TimeStamp: { type: String}

});

var pricehistories = mongoose.model('pricehistories', pricehistoriesSchema);




module.exports = pricehistories;
