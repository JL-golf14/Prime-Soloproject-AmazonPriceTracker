var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  clearanceLevel: { type: Number, required: true, default: 2, min: 0, max: 10}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
