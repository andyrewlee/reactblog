var React = require('react');

var PostsBox = React.createClass({
  getInitialState: function() {
    return { model: this.props.data }
  },
  handlePostSubmit: function(post) {
    var self = this;
    $.ajax({
      url: '/posts',
      method: "POST",
      data: post,
      success: function(res){
        console.log('success', res);
        var posts = self.state.model;
        var newPosts = posts.concat(res.newPost);
        self.setState({model: newPosts});
      },
      error: function(){
        console.log('failure');
      }
    });
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
    this.props.onPostSubmit({id: this.state.id, content: content});
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
          created_at={post.created_at.toString()}
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
  getInitialState: function() {
    return {
      userIsEditing: false,
      currentContent: this.props.content
    }
  },
  handlePostDelete: function() {
    this.props.handlePostDelete(this.props.id);
  },
  handleChange: function() {
    this.setState({currentContent: React.findDOMNode(this.refs.content).value.trim()});
  },
  handlePostToggle: function() {
    if(this.state.userIsEditing == true) {
      this.setState({userIsEditing: false});
    } else {
      this.setState({userIsEditing: true});
    }
  },
  render: function() {
    var postContent;
    if(this.state.userIsEditing == true) {
      var handleSubmit = this.handleSubmit;
      var handleChange = this.handleChange;
      var currentContent = this.state.currentContent;
      postContent = (function() {
        return (
          <form className="editPostForm" onSubmit={handleSubmit}>
            <input type="text"
                   ref="content"
                   value={currentContent}
                   onChange={handleChange} />
            <input type="submit" value="Post" />
          </form>
        );
      })();
    } else {
      var createdAt = this.props.created_at;
      var content = this.state.currentContent;
      postContent = (function() {
        return (
          <div className="postContent">
            <h2>{createdAt}</h2>
            <div>{content}</div>
          </div>
        )
      })();
    }
    return (
      <div className="postContent">
        {postContent}
        <PostAdmin
          key={this.props.id}
          id={this.props.id}
          handlePostDelete={this.props.handlePostDelete}
          handlePostToggle={this.handlePostToggle}
          userIsEditing={this.state.userIsEditing} />
      </div>
    )
  }
});

var PostAdmin = React.createClass({
  handleDelete: function() {
    this.props.handlePostDelete(this.props.id);
  },
  handleEdit: function() {
    this.props.handlePostToggle();
  },
  handleClose:function() {
    this.props.handlePostToggle();
  },
  handleUpdate:function() {
    this.props.handlePostToggle();
  },
  render: function() {
    var buttonGroup;
    var handleDelete = this.handleDelete;
    var handleEdit = this.handleEdit;
    var handleClose = this.handleClose;
    var handleUpdate = this.handleUpdate;

    if(this.props.userIsEditing == true) {
      buttonGroup = (function() {
        return (
          <div className="editingButtons">
            <button onClick={handleClose}>Close</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        );
      })();
    } else {
      buttonGroup = (function() {
        return (
          <div className="notEditingButtons">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )
      })();
    }
    return (
      <div className="postAdmin">
        {buttonGroup}
      </div>
    );
  }
});

module.exports = PostsBox;
