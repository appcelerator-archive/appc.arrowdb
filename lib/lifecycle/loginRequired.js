var ArrowDB = require('arrowdb');

/**
 * loginRequired checks to see if the current req for this connector requires the user to login.
 */
exports.loginRequired = function loginRequired(request, next) {
	if (this.db || !request) {
		return next(null, false);
	}
	if (request.headers && request.headers.sessioncookiestring) {
		// check local cache
		var db = this.cache && this.cache.get(request.headers.sessioncookiestring);
		if (db) {
			this.db = db;
			return next(null, false);
		}
		var headers = request.headers || {},
			opts = this.getOpts(),
			key = this.getKey();

		this.db = new ArrowDB(key, opts);
		this.db.sessionCookieString = headers.sessioncookiestring;
		this.cache && this.cache.set(request.headers.sessioncookiestring, this.db);
		return next(null, !request.cookies.arrowdbuid);
	}
	return next(null, true);
};