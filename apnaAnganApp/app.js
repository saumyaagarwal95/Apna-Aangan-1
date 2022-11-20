// "start": "node ./bin/www"
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon= require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
http=require('http');
var bcrypt= require('bcrypt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var adminRouter = require('./routes/admin_duties');

var app = express();

const server = http.createServer(app);
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');

app.use(cors());

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {

    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//Connect
const io = socketIO(server);
module.exports.io = function(topic, data) {
    msg = {
        payload: data
    };
    io.emit(topic, msg);
    //console.log('topic is: ' + topic + ' msg: ' + msg.payload);
};
io.on('connection', (socket) => {
  
      console.log('Websocket Client Connected');
      //Disconnect
      socket.on('disconnect', (data) => {
          console.log('Websocket Client Disconnected');
      });
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses',coursesRouter);
app.use('/admin', adminRouter);

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
