var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pigs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var pigRoutes = require('./routes/pig.js')(app);

var server = app.listen(3000, function () {
	console.log('Server running at http://127.0.0.1:3000/');
});
