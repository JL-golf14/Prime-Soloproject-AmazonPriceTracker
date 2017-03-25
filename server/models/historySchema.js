var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var historySchema = new Schema({
  Asin: { type: String,  required: true },
  ItemTitle: { type: String},
  ProductId:{ type: String},
  Price: { type: String,  required: true },
  ProductGroup:{ type: String,  required: true },
  TimeStamp: { type: String,  required: true }

});

var PriceHistory = mongoose.model('PriceHistory', historySchema);




module.exports = PriceHistory;
