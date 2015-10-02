var React = require('react'); 
var PostsBox = require('./../components/postsBox.jsx');

var data = JSON.parse(document.getElementById('initialPostData').getAttribute('data-json')); 


React.render(<PostsBox data={data} />, document.getElementById("app"));
