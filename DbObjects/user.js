var User = require('../models/users.js');
var mongoose = require('mongoose');

var promise = require('bluebird');
mongoose.Promise = global.Promise;

mongoose.connect('localhost:27017/login');

var user = new User({
    username: 'test',
    email: 'test@hotmal.com',
    password: 'password'
});


user.save(function(err,result){
  if (err) {
    console.log('Error occurred' + err);
    mongoose.disconnect();
  }else {
    console.log('Success!');
    mongoose.disconnect();
  }
  // exit();
});
// user.save().then(mongoose.disconnect());
//
// function exit() {
//   mongoose.disconnect();
// }
