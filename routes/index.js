var fs = require('fs')
    Blog = require('../models/blog'),
    User = require('../models/user');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
//    var flag = isInstall(req, res, next);
//    if (flag) {
      
      var query = {
        inPage: 1,
        showDatas: 3,
        sortType: 1
      };
//      var userTop = User.getPageUser(query);
//      
//      
//      console.log(userTop);
      
      Blog.get(null, function (error, blogs) {
        res.render('index', { title: '首页', user: req.session.user, blogs: blogs });
      });
  
  
      
//    } else {
//      res.redirect('install');
//    }
  });
  
//  app.get('/install', isInstall);
  // 安装定向页面
  app.get('/install', function(req, res, next) {
    console.log('install');
    var dbs = fs.readFileSync("install/db_install", "utf-8").split('\n'); // 读取支持数据库文件
    res.render('install/install', { title: '安装系统', dbs: dbs });
  });
  // 检查系统是否安装
  function isInstall(req, res, next) {
    try {
      var flag = fs.readFileSync("install/is_install", "utf-8"); // 读取安装检测文件
      console.log(flag);
      if (flag == 'false') {
        res.redirect('install');
      } else {
         res.render('404', { title: '404', error: '系统已经安装' }); // 将错误发送到页面
      }
    } catch (e) {
      res.render('404', { title: '404', error: e.stack }); // 将错误发送到页面
    }
  };
};