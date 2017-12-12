var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var jsonParser = bodyParser.json();



router.get('/', function(req, res, next) {
  res.render('contact/index.ejs', {
    title: 'Form Validation',
    success: req.session.success,
    errors: req.session.errors
  });
  req.session.errors = null;
  req.session.success = false;
});

router.post('/form', jsonParser, function(req, res) {

  console.log("Session value : " + req.session.success);
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('name', 'Invalid name, only alpha numeric charactesr allowed').notEmpty();
  req.checkBody('comment', 'Please enter a comment').notEmpty();

  var errors = req.getValidationResult().then(function(result) {
    if (result.array().length > 0) {

      req.session.success = false;
      console.log("errors!!");
      console.log("result!!!: " + result.array());

      // var errors = result.array().map(function(elem) {
      //   return elem.msg;
      // });
      // console.log('Here are following validation errors: ' + errors.join(' \n'));
      console.log(result.array());
      req.session.errors = result.array();
    } else {
      console.log("success!!");
      req.session.success = true;

      // send email
      var transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'jjm21@hotmail.co.uk',
          pass: 'Grandad8wow'
        }
      });

      var mailOptions = {
        from: 'jjm21@hotmail.co.uk',
        to: req.params('email'),
        subject: 'Testing website',
        text: req.params('comment')
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


    }

  }).then(function() {
    res.redirect('/contact');
  });


  // req.checkBody('Email','Must be valid emaill address').isEmail().notEmpty();
  // req.checkBody('Name','Invalid name').isAlpha().notEmpty();
  // req.checkBody('Comment','Please fill in this field').notEmpty();


  // console.log('Email ' + req.body.email);
  // console.log('Name' + req.body.name);
  // console.log('Comment' + req.body.comment);
  // res.redirect('/submitted');
  // res.redirect('/submitted');

});


module.exports = router;
