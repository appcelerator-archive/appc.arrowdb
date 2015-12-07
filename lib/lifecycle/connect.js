/**
 * Connects to ArrowDB; this connection can later be used by our methods.
 * @param next
 */
exports.connect = function connect(next) {
	var self = this;
	if (!this.config.username) {
		return next();
	}
	this.logger.trace('logging into ArrowDB as', this.config.username);
	this.baseDB.usersLogin({
		login: this.config.username,
		password: this.config.password
	}, function (err, result) {
		if (err) {
			return next(err);
		}

		self.logger.trace('successfully logged in');
		self.logger.trace('session cookie:', self.baseDB.sessionCookieString);
		self.baseUser = result.body.response.users[0];
		next();
	});
};
