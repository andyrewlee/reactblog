var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var globals = require('./config/globals');
var mysql = require('mysql');
require('babel/register');

var index = require('./app/controllers/index');
var bundles = require('./app/controllers/bundles');
var posts = require('./app/controllers/posts');

app.use(bodyParser.urlencoded());
app.use('/', index);
app.use('/bundles', bundles);
app.use('/posts', posts);

app.set('view engine', 'jsx');
var options = {transformViews: false};
app.engine('jsx', require('express-react-views').createEngine(options));
app.set('views', __dirname + '/app/views');
app.use(express.static(path.join(__dirname, './app/assets')));

app.set('port', globals.applicationPort);

var server = app.listen(app.get('port'), function() {
  var connection = mysql.createConnection(globals.database());
  connection.connect(function(err) {
    if(err) {
      console.log('Error connecting to database');
    } else {
      console.log('Connected to database');
    }
  });
  console.log('Server running on port ' + app.get('port'));
});
