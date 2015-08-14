var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var swig = require('swig');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');

var routes = require('./routes/index');
var bowerPath = path.join(__dirname, 'bower_components');
var publicPath = path.join(__dirname, 'public');

app.engine('html', swig.renderFile);
app.use(express.static(bowerPath));
app.use(express.static(publicPath));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);


app.listen(1234);
console.log("heyo!");