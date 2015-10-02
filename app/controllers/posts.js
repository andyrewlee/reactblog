var express = require('express');
var router = express.Router();

var Post = require('./../models/post');

router.post('/', function(req, res) {
  Post.create(req.body, function(err, obj) {
    if(err) {
      res.status(400).send({error: err.message});
    } else {
      res.send(obj);
    }
  });
});

module.exports = router;
