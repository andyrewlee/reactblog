var express = require('express');
var router = express.Router();

var Post = require('./../models/post');

router.post('/', function(req, res) {
  Post.create(req.body, function(err, obj) {
    if(err) {
      res.status(400).send({error: err});
    } else {
      res.send(obj);
    }
  });
});

router.delete('/:id', function(req, res) {
  console.log(req.params.id);
  Post.destroy(req.params.id, function(err, obj) {
    if(err) {
      res.status(400).send({error: err});
    } else {
      res.send(obj);
    }
  });
});

router.patch('/:id', function(req, res) {
  console.log(req.body);
  Post.update(req.params.id, req.body, function(err, obj) {
    if(err) {
      res.status(400).send({error: err});
    } else {
      res.send(obj);
    }
  });
});

module.exports = router;
