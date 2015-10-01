var React = require('react');

var PostsBox = React.createClass({
  getInitialState: function() {
    return { model: this.props.data }
  },
  handlePostSubmit: function(post) {
    var posts = this.state.model;
    var newPosts = posts.concat([post]);
    this.setState({model: newPosts});
  },
  handlePostDelete: function(id) {
    console.log('PostAdmin wants to delete', id);
    var posts = this.state.model;
    for(var i = 0; i < this.state.model.length; i++) {
      if(this.state.model[i].id == id) {
        this.state.model.splice(i, 1);
        break;
      }
    }
    this.setState({model: posts});
  },
  render: function() {
    return (
      <div className='postsBox'>
        <h1>Posts</h1>
        <PostForm onPostSubmit={this.handlePostSubmit}/>
        <PostsList data={this.state.model} 
                   handlePostDelete={this.handlePostDelete} />
      </div>
    );
  }
});

var PostForm = React.createClass({
  getInitialState: function() {
    return {id: 4}
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var content = React.findDOMNode(this.refs.content).value.trim();
    this.props.onPostSubmit({id: this.state.id, content: content, created_at: '2015-09-24 17:40:41'});
    this.setState({id: this.state.id + 1});
    React.findDOMNode(this.refs.content).value = '';
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
  handlePostDelete: function() {
    this.props.handlePostDelete(this.props.id);
  },
  render: function() {
    var handlePostDelete = this.props.handlePostDelete;
    var postNodes = this.props.data.map(function(post) {
      return (
        <Post
          key={post.id}
          id={post.id}
          created_at={post.created_at}
          content={post.content}
          handlePostDelete={handlePostDelete} />
      );
    });
    return (
      <div className="postsList">
        {postNodes}
      </div>
    );
  }
});

var Post = React.createClass({
  handlePostDelete: function() {
    this.props.handlePostDelete(this.props.id);
  },
  render: function() {
    return (
      <div className="postContent">
        <h2>{this.props.created_at}</h2>
        <div>{this.props.content}</div>
        <PostAdmin
          key={this.props.id}
          id={this.props.id}
          handlePostDelete={this.props.handlePostDelete} />
      </div>
    )
  }
});

var PostAdmin = React.createClass({
  handleDelete: function() {
    this.props.handlePostDelete(this.props.id);
  },
  handleEdit: function() {
    console.log('Edit pressed', this.props.id);
  },
  render: function() {
    return (
      <div className="postAdmin">
        <button onClick={this.handleDelete}>Delete</button>
        <button onClick={this.handleEdit}>Edit</button>
      </div>
    );
  }
});

module.exports = PostsBox;
