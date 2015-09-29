var Post = {
  all: function(callback) {
    var data = [
      {id: 1, content: 'First Post', created_at: '2015-09-24 14:04:02'},
      {id: 2, content: 'Second Post', created_at: '2015-09-24 16:13:21'},
      {id: 3, content: 'Third Post', created_at: '2015-09-24 17:40:41'}
    ];
    return callback(data);
  }
}

module.exports = Post;
