var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  clearanceLevel: { type: Number}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
