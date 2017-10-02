var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username : { type: String, required: true },
  email : { type: String, required: true},
  //created : { type: Date, default: Date.now},
  password: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
