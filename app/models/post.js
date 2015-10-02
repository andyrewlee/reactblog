var mysql = require('mysql');
var globals = require('./../../config/globals');
var connection = mysql.createConnection(globals.database());

var Post = {
  all: function(callback) {
    var query = 'SELECT * FROM posts';
    connection.query(query, function(err, rows, fields) {
      if(err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
  create: function(params, callback) {
    var newPost = {
      content: params.content,
      created_at: new Date(),
      updated_at: new Date()
    };

    var query = 'INSERT INTO posts SET ? ';

    connection.query(query, newPost, function(err, rows, fields) {
      if(err) {
        var error = "Post was not created";
        callback(error, null);
      } else {
        newPost.id = rows.insertId;
        callback(null, {message: 'Post created', newPost: newPost});
      }
    });
  }
}

module.exports = Post;
