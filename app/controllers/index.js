var express = require('express');
var router = express.Router();
var React = require('react');
var PostsBox = require('./../views/components/postsBox.jsx');

var Post = require('./../models/post');

router.get('/', function(req, res) {
  Post.all(function(data) {
    res.render('layouts/mainLayout',
      {
        app: React.renderToString(React.createElement(PostsBox, {data: data})),
      });
  });
});

module.exports = router;
