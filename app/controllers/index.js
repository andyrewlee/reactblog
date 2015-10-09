var express = require('express');
var router = express.Router();
var React = require('react');
var PostsBox = require('./../views/components/postsBox.jsx');

var Post = require('./../models/post');

router.get('/a', function(req, res) {
  Post.all(function(err, rows) {
    var rows = JSON.stringify(rows);
    res.render('layouts/mainLayout',
      {
        app: React.renderToString(React.createElement(PostsBox, {data: JSON.parse(rows)})),
        postRows: rows
      });
  });
});

router.get('/', function(req, res) {
  res.send("testing");
});

module.exports = router;
