var React = require('react');

var MainLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Hello React!</title>
          <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.app}}></div>
          <script src="/bundles/postsBox.js"></script>
        </body>
      </html>
    );
  }
});

module.exports = MainLayout;
