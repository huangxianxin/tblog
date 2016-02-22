var crypto = require('crypto'),
    uuid = require('uuid'),
    moment = require('moment'),
    User = require('../models/user.js'),
    Errors = require('../models/errors.js');

module.exports = function(app) {
  
  // 注册功能
  app.get('/sign_up', isLogin);
  app.get('/sign_up', function(req, res) {
    var userId = uuid.v4(); // 注册时,生成用户ID
    res.render('sign_up', { title: '注册', user: req.session.user, userId: userId });
  });
  app.post('/sign_up', isLogin);
  app.post('/sign_up', function (req, res) {
    var userId = req.body.userId,
      userName = req.body.userName,
      userPassword = req.body.userPassword,
      userRePassword = req.body.userRePassword,
      userEmail = req.body.userEmail,
      userCard = req.body.userCard,
      userAge = req.body.Age,
      userPhone = req.body.userPhone,
      userImageUrl = req.body.userImageUrl,
      userDomain = req.body.userDomain,
      userCreateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      if (userName == '' || userName == null) {
        userName = userEmail;
      }
    var formUser = new User({
      userId: userId,
      userName: userName,
      userPassword: crypto.createHash('md5').update(userPassword).digest('hex'),
      userEmail: userEmail,
      userCard: userCard,
      userAge: userAge,
      userPhone: userPhone,
      userImageUrl: userImageUrl,
      userDomain: userDomain,
      userCreateTime: userCreateTime
    });
    var query = {
      userEmail: userEmail
    }
    User.getUser(query, function (err, user) {
      if (user) { // 用户存在
        var errors = new Errors({
          errorCode: 4002,
          errorMessage: '用户已存在',
          errorTime: userCreateTime,
          errorUrl: req.originalUrl
        });
        return res.render('error', {title: '错误信息', errors: errors, user: req.session.user});
      }
      formUser.save(function (err, user) {
//        req.session.user = newUser;//用户信息存入 session
        res.redirect('/sign_in');//注册成功后返回主页
      });
    });
  });
  
  
  // 用户登录
  app.get('/sign_in', isLogin);
  app.get('/sign_in', function(req, res) {
      res.render('sign_in', { title: '登录', user: req.session.user});
  });
  app.post('/sign_in', isLogin);
  app.post('/sign_in', function(req, res) {
      var userEmail = req.body.userEmail,
          userPassword = crypto.createHash('md5').update(req.body.userPassword).digest('hex');
      var query = {
        userEmail: userEmail,
        userPassword: userPassword
      }
      User.getUser(query, function (error, user) {
        if (!user) { // 不存在该用户
          var errors = new Errors({
            errorCode: 4003,
            errorMessage: '用户不存在',
            errorTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            errorUrl: req.originalUrl
          });
          return res.render('error', {title: '错误信息', errors: errors, user: req.session.user});
        }
        if (user.userPassword != userPassword) { // 密码错误
          var errors = new Errors({
            errorCode: 4001,
            errorMessage: '用户密码错误',
            errorTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            errorUrl: req.originalUrl
          });
          return res.render('error', {title: '错误信息', errors: errors, user: req.session.user});
        }
        req.session.user = user;
        res.redirect('/');
      });
  });
  
  app.get('/sign_out', noLogin);
  app.get('/sign_out', function(req, res) {
     req.session.user = null;
     res.redirect('sign_in');
  });
  
  app.get('/error', function(req, res) {
    var errors = new Errors({
      errorCode: 4005,
      errorMessage: '您没有权限访问该页面',
      errorTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      errorUrl: req.originalUrl
    });
    res.render('error', {title: '错误信息', errors: errors, user: req.session.user});
  });
  
  // 个人信息
  app.get('/user/:userName/:accessType', function(req, res) {
    var userName = req.params.userName,
      accessType = req.params.accessType;
    if (accessType == 'info') {
      var query = {
        userName: userName
      }
      User.getUser(query, function (error, userInfo) {
        res.render('user/user', {title: '个人信息', user: req.session.user, userInfo: userInfo});
      });
    }
  });
  
  function noLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect('/error');
    }
    next();
  }
  function isLogin(req, res, next) {
    if (req.session.user) {
      res.redirect('/error');
      res.redirect('back');
    }
    next();
  }
};