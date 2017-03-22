var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amazonSchema = new Schema({
  secrecyLevel: { type: Number,  default: 3, min: 0, max: 10 },
  secretText: { type: String, required: true }
});

var Amazon = mongoose.model('Amazon', amazonSchema);

module.exports = Amazon;
