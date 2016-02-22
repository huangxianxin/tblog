var mongodb = require('../models/mongo_db');

function User(user) {
	this.userId = user.userId; // 用户ID
	this.userName = user.userName; // 用户名
	this.userPassword = user.userPassword; // 密码
	this.userEmail = user.userEmail; // 邮箱
	this.userCard = user.userCard; // 身份证
	this.userAge = user.userAge; // 年龄
	this.userPhone = user.userPhone; // 手机
	this.userImageUrl = '/images/user_default.png'; // 头像
	this.userDomain = user.userDomain; // 个性域名
	this.userCreateTime = user.userCreateTime; // 创建时间
};

module.exports = User;

// 保存信息
User.prototype.save = function(callback) {
	// 用户信息
	var user = {
		userId: this.userId,
		userName: this.userName,
		userPassword: this.userPassword,
		userEmail: this.userEmail,
		userCard: this.userCard,
		userAge: this.userAge,
		userPhone: this.userPhone,
		userImageUrl: this.userImageUrl,
		userDomain: this.userDomain,
		userCreateTime: this.userCreateTime
	};
	mongodb.open(function(error, db) {
		db.collection('users', function(error, collection) {
			// 添加用户信息
			collection.insert(user, {safe: true}, function (error, user) {
				mongodb.close();
				callback(null, user[0]);
			});
		});
	});
};

// 根据邮箱获取用户
User.getUser = function (query, callback) {
	mongodb.open(function (error, db) {
		db.collection('users', function (error, collection) {
			collection.findOne(query, function (error, user) {
				mongodb.close();
				callback(null, user); // 返回查询的用户信息
			});
		});
	});
};

// 分页查询及排序
User.getPageUser = function (query, callback) {
	mongodb.open(function(error, db) {
		db.collection('users', function(error, collection) {
			collection.find({
				skip: (query.inPage - 1) * query.showDatas,
				limit: query.showDatas
			}).sort({_id: query.sortType}).toArray(function(error, users) {
				mongodb.close();
				return callback(null, users);
			});
		});
	});
}