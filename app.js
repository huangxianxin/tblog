// 依赖模块
var express = require('express');
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    moment = require('moment'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    multer = require('multer');

// 路由
var routes = require('./routes/index'),
    settings = require('./configs/config'),
    Errors = require('./models/errors.js'),
    blogs = require('./routes/blogs.js'), // 博客
    users = require('./routes/users'); // 用户

var app = express();

// 设置ejs模版引擎并渲染为html模版
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 启用session并保存到mongodb中
app.use(session({
  resave:false, // 解决 express-session deprecated undefined resave option; provide resave option app.js 错误
  saveUninitialized: true, // 解决 express-session deprecated undefined saveUninitialized option; provide saveUninitialized option app.js 错误
  secret: settings.cookieSecret,
  key: settings.db, // cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // cookie保持30天
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));
// 处理图像
app.use(multer({
  dest: './public/images',
  rename: function (fieldname, filename) {
    return filename;
  }
}));


routes(app);
users(app);
blogs(app);
//app.use('/', routes);
//app.use('/users', users);

// 全局404错误
app.get('*', function(req, res) {
  var err = new Error('Not Found');
  var errors = new Errors({
    errorCode: 404,
    errorMessage: '未找到资源',
    errorTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    errorUrl: req.originalUrl,
    errorDetails: err.stack
  });
  res.render('404', {title: '404', errors: errors, user: req.session.user});
});

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
////  next(err);
//  res.render('404', { title: '404', error: err.stack });
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    var errors = new Errors({
      errorCode: 500,
      errorMessage: '服务器错误',
      errorTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      errorUrl: req.originalUrl,
      errorDetails: err.stack
    });
    res.render('500', {title: '500', errors: errors, user: req.session.user});
//    res.render('500', { title: '500', error: err.stack });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var errors = new Errors({
    errorCode: 500,
    errorMessage: '服务器错误',
    errorTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    errorUrl: req.originalUrl,
    errorDetails: err.stack
  });
  res.render('500', {title: '500', errors: errors, user: req.session.user});
});


module.exports = app;
