exports.getDB = function () {
	if (this.db) {
		return this.db;
	}
	if (this.config.requireSessionLogin) {
		throw new Error('Authentication is required. Please pass these headers: user, and pass; or sessionCookieString.');
	}
	return this.baseDB;
};
