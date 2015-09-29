var React = require('react'); 
var PostsBox = require('./../components/postsBox.jsx');

var Post = require('./../../models/post');
console.log('j');

Post.all(function(data) {
  React.render(<PostsBox data={data} />, document.getElementById("app"));
});
