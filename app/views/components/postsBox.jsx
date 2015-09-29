var React = require('react');

var PostsBox = React.createClass({
  getInitialState: function() {
    return { model: this.props.data }
  },
  render: function() {
    return (
      <div className='postBox'>
        <h1>Posts</h1>
        <PostForm />
        <PostsList data={this.state.model} />
      </div>
    );
  }
});

var PostForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    console.log('hi');
  },
  render: function() {
    return (
      <form className="postForm" onSubmit={this.handleSubmit}>
        <input type="text" ref="content" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var PostsList = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function(post) {
      return (
        <Post key={post.id} created_at={post.created_at} content={post.content} />
      );
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }
});

var Post = React.createClass({
  render: function() {
    return (
      <div className="post">
        <h2>{this.props.created_at}</h2>
        <div>{this.props.content}</div>
      </div>
    )
  }
});


module.exports = PostsBox;
