var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');


var index = require('./routes/index');
var api = require('./routes/api');
var buy = require('./routes/buy');
var office = require('./routes/office');
var barcode = require('./routes/barcode'); 
var product = require('./routes/product'); 
var mobile = require('./routes/mobile'); 

var mysql = require('mysql');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/buy', buy);
app.use('/office', office);
app.use('/barcode', barcode);
app.use('/product', product);
app.use('/mobile' , mobile);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.session = req.session;
  res.status(err.status || 500);
 // res.redirect('/');
  res.render('error' , {layout : false});
});

module.exports = app;
