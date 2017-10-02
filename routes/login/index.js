var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });

router.use(csrfProtection);


router.get('/', csrfProtection, function(req,res,next){
  res.render('login/index.ejs', {csrfToken : req.csrfToken()});
});

router.post('/signin', parseForm, csrfProtection, function(req,res){

  console.log('Username: \t ' + req.body.username);
  console.log('Email: \t' + req.body.password);
  console.log('CSRF: \t ' + req.body._csrf);
  res.render('login/successful.ejs');

});


module.exports = router;
