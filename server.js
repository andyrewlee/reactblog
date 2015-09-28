var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var globals = require('./config/globals');

var index = require('./app/controllers/index');
app.use('/', index);

app.set('view engine', 'jsx');
var options = {beautify: true};
app.engine('jsx', require('express-react-views').createEngine(options));
app.set('views', __dirname + '/app/views');
app.use(express.static(path.join(__dirname, './app/assets')));

app.use(bodyParser.urlencoded());
app.set('port', globals.applicationPort);

var server = app.listen(app.get('port'), function() {
  console.log('Server running on port ' + app.get('port'));
});
