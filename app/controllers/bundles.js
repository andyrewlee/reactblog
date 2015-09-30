 var express = require('express');
 var router = express.Router();
 var browserify = require('browserify');

 router.get('/postsBox.js', function(req, res) {
   res.setHeader('content-type', 'application/javascript'); 
   browserify('./app/views/bundles/postsBox')
     .transform('reactify')
     .bundle() 
     .pipe(res); 
 });

module.exports = router;
