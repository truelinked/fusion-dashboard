var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Home page router
var indexRouter = require('./routes/index');

// Fusion API test router
var uploadRouter = require('./routes/fusionApiTest/upload');
var searchRouter = require('./routes/fusionApiTest/search');
var runRouter = require('./routes/fusionApiTest/run');
var suiteRouter = require('./routes/fusionApiTest/suites');
var productionRouter = require('./routes/compare/productions');


var app = express();

// MongoDB setup
var mongoDB = 'mongodb://127.0.0.1:27017/rest-dashboard'
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/search', searchRouter);
app.use('/run', runRouter);
app.use('/suites', suiteRouter)
app.use('/productions', productionRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
