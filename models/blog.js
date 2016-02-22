var mongodb = require('../models/mongo_db'),
	mditor = require("mditor"), // 增加markdown解析
	parser = new mditor.Parser();

function Blog(blog) {
	this.blogId = blog.blogId; // id
	this.blogTitle = blog.blogTitle; // 标题
	this.blogUser = blog.blogUser; // 用户信息
	this.blogContent = blog.blogContent; // 内容
//	this.blogMd = blog.blogMd; // markdown
//	this.blogHtml = blog.blogHtml; // html
	this.blogCreateTime = blog.blogCreateTime; // 创建时间
	this.blogTags = blog.blogTags; // 标签
	this.blogTime = blog.blogTime; // 时间
	this.blogTimestamp = blog.blogTimestamp; // 时间戳
	this.blogCollect = 0; // 收藏,默认0
	this.blogCollectAuthor = blog.blogCollectAuthor; // 收藏者
	this.blogPV = 0; // 浏览量,默认0
	this.blogRec = 0; // 推荐量,默认0
	this.blogRecAuthor = blog.blogRecAuthor; // 推荐者
}

module.exports = Blog;

// 添加用户信息
Blog.prototype.save = function (user, callback) {
	var date = new Date();
	var times = {
		date: date,
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDay(),
		minute: date.getMinutes(),
		seconds: date.getSeconds()
	};
	var blog = {
		blogId: this.blogId,
		blogTitle: this.blogTitle,
		blogUser: this.blogUser,
		blogContent: this.blogContent,
		blogMd: this.blogMd,
		blogHtml: this.blogHtml,
		blogCreateTime: this.blogCreateTime,
		blogTags: this.blogTags,
		blogTime: times,
		blogTimestamp: date.getTime(),
		blogCollect: this.blogCollect,
		blogCollectAuthor: this.blogCollectAuthor,
		blogPV: this.blogPV,
		blogRec: this.blogRec,
		blogRecAuthor: this.blogRecAuthor
	};
	mongodb.open(function(error, db) {
		db.collection('blogs', function(error, collection) {
			collection.insert(blog, {safe: true}, function (error, blog) {
				mongodb.close();
				callback(null, blog[0]);
			});
		});
	});
};

Blog.get = function(query, callback) {
	mongodb.open(function(error, db) {
		db.collection('blogs', function (error, collection) {
			collection.find(query).sort({
				blogTimestamp: 1 //生序
			}).toArray(function (error, documents) {
				mongodb.close();
				//解析 markdown 为 html
				documents.forEach(function (documents) {
					documents.blogContent = parser.parse(documents.blogContent);
				});
				callback(null, documents);
			});
		})
	});
};

Blog.getBlog = function(query, callback) {
	mongodb.open(function(error, db) {
		db.collection('blogs', function (error, collection) {
			collection.findOne(query, function (error, documen) {
				mongodb.close();
				//解析 markdown 为 html
				documen.blogContent = parser.parse(documen.blogContent);
				callback(null, documen);
			});
		})
	});
};