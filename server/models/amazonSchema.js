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


//
// // on every save, add the date
// userSchema.pre('save', function(next) {
//   // get the current date
//   var currentDate = new Date();
//
//   // change the updated_at field to current date
//   this.updated_at = currentDate;
//
//   // if created_at doesn't exist, add to that field
//   if (!this.created_at)
//     this.created_at = currentDate;
//
//   next();
// });
