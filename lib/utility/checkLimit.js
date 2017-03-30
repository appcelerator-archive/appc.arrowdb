/**
 * Makes sure that the limit is valid.
 * @param limit
 */
exports.checkLimit = function checkLimit(limit) {
	if (limit && (limit > 1000 || limit < 1)) {
		var err = new Error('Invalid limit parameter; value must be in a valid range of 1~1000');
		err.errorCode = 400;
		err.statusCode = 400;
		err.reason = err.message;
		err.response = {};
		err.docUrl = '';
		err.body = {meta: {code: 400, status: 'fail', message: err.message}};
		throw err;
	}
};