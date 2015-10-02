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

    connection.query(query, newPost, function(err, result) {
      if(err) {
        var error = "Post was not created";
        callback(error, null);
      } else {
        newPost.id = result.insertId;
        callback(null, {message: 'Post created', newPost: newPost});
      }
    });
  },
  destroy: function(id, callback) {
    var query = 'DELETE FROM posts WHERE id = ' + connection.escape(id);
    console.log(query);
    connection.query(query, function(err, result) {
      if(err) {
        var error = "Post was not destroyed";
        callback(error, null);
      } else {
        callback(null, rows);
      }
    });
  }
}

module.exports = Post;
