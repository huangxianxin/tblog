var crypto = require('crypto'),
		uuid = require('uuid'),
		moment = require('moment'),
		Blog = require('../models/blog'),
		Errors = require('../models/errors');

module.exports = function(app) {
	
	// 发表博客
	app.get('/new_blog', function(req, res) {
		res.render('blog/new_blog', { title: '写文章', user: req.session.user});
	});
	app.post('/new_blog', function (req, res) {
		var blogTitle = req.body.blogTitle,
			blogContent = req.body.blogContent,
			user = req.session.user,
			blogCreateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			blogTags = req.body.blogTags;
			console.log(req.session.user);
		var formBlog = new Blog({
			blogId: uuid.v4(),
			blogTitle: blogTitle,
			blogUser: user,
			blogContent: blogContent,
			blogTags: blogTags,
			blogCreateTime: blogCreateTime,
			userImageUrl: user.userImageUrl
		});
		formBlog.save(req.session.user, function (error) {
			res.redirect('/');
		});
	});
	
	app.get('/blog/:blogId', function(req, res) {
		var query = {
			blogId: req.params.blogId
		}
		Blog.getBlog(query, function (error, blogInfo) {
			res.render('blog/get_blog', {title: blogInfo.blogTitle, user: req.session.user, blogInfo: blogInfo });
		})
		
		
	});
	
	
	
	
	
	
	
	
	
	
	
};