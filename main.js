var express = require('express');
var ejs = require('ejs');
var csrf = require('csurf');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = require('bluebird');
var expressValidator = require('express-validator');

//Creates an instance of the application
var app = express();


var home = require('./routes/home/index.js');
var contact = require('./routes/contact/index.js');
var gallery = require('./routes/gallery/index.js');
var login = require('./routes/login/index.js');
var credentials = require('./credentials.js');
var submitted = require('./routes/submitted/index.js');



mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/login').then(console.log("success"));


app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//Adds items to the middleware stack
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'Crazy Secret ', resave: false, saveUninitialized: false }));



//Port in which the application starts
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost: '+ app.get('port'));
});

// Pages to load
app.use('/',home);
app.use('/contact',contact);
app.use('/gallery', gallery);
app.use('/login',login);
app.use('/submitted', submitted);


app.use(function(req,res){
  res.type('text/html');
  res.status(404);
  res.render('404');

});
