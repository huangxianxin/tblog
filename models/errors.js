function Errors(error) {
	this.errorCode = error.errorCode; // 错误码
	this.errorMessage = error.errorMessage; // 错误信息
	this.errorDetails = error.errorDetails; // 错误详情
	this.errorTime = error.errorTime; // 出错时间
	this.errorUrl = error.errorUrl; // 错误地址
};

module.exports = Errors;