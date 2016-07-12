/**
 * Gets a reference to the ArrowDB instance we're using to communicate with the server. Takes in to account
 * request-based or globally scoped instances.
 * @returns {*}
 */
exports.getDB = function () {
	if (this.db) {
		return this.db;
	}
	if (this.config.requireSessionLogin) {
		throw new Error('Authentication is required. Please pass these headers: user, and pass; or sessionCookieString.');
	}
	return this.baseDB;
};
