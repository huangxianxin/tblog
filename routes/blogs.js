var crypto = require('crypto'),
		uuid = require('uuid'),
		moment = require('moment'),
		Blog = require('../models/blog'),
		Errors = require('../models/errors');

module.exports = function(app) {
	
	// 发表文章
	app.get('/blog/new', function(req, res) {
		res.render('blog/new_blog', { title: '写文章', user: req.session.user});
	});
	app.post('/blog/new', function (req, res) {
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
	
	// 文章操作
	app.get('/blog/:blogId/:accessType', function(req, res) {
		var accessType = req.params.accessType;
		if (accessType == 'info') {
			var query = {
				blogId: req.params.blogId
			}
			Blog.getBlog(query, function (error, blogInfo) {
				res.render('blog/get_blog', {title: blogInfo.blogTitle, user: req.session.user, blogInfo: blogInfo });
			})
		} else if (accessType == 'del') {
			console.log('\n\n' + req.params.blogId + '\n\n');
			var query = {
				blogId: req.params.blogId
			}
			Blog.delete(query, function(error) {
				res.redirect('/');
			});
		}
	});
	
	
	
	
	
	
	
	
	
	
	
};