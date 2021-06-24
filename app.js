const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const contactsRouter = require('./routes/contacts');
const adminRouter = require('./routes/admin');
const redis = require('redis');
const client = redis.createClient('redis://:pc047b3f4c31995dd62188df5ce1dfaf26672df9bf47ec469aefdb9eef482d92f@ec2-54-211-207-92.compute-1.amazonaws.com:26849');

const specs = require('./docs/swaggerDocs');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Open the server to public
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: false }));
app.use('/api', contactsRouter);
app.use('/api', adminRouter);

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
