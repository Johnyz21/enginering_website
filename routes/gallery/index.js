var express = require('express');
var router = express.Router();
var fs = require('fs');

const dir = 'public/img/gallery'

router.get('/', function(req,res,next){
  fs.readdir(dir, (err,files) => {

    // files.length -1 because of the .DS_Store file
    res.render('about/index.ejs', { length: files.length-1} );

  });

});


module.exports = router;
