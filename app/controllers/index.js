require("babel/register");
var express = require('express');
var router = express.Router();
var React = require('react');
var PostBox = require('./../views/components/postBox.jsx');

router.get('/', function(req, res) {
  res.render('layouts/mainLayout', {app: React.renderToString(React.createElement(PostBox))});
});

module.exports = router;
