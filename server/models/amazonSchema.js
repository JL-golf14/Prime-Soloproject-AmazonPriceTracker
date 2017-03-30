var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amazonSchema = new Schema({
  Asin: { type: String,  required: true },
  ItemTitle: { type: String, index: { unique: true, dropDups: true }},
  Price: { type: String,  required: true },
  ProductGroup:{ type: String,  required: true },
  TimeStamp: { type: String,  required: true }

});

var Amazon = mongoose.model('Amazon', amazonSchema);




module.exports = Amazon;
