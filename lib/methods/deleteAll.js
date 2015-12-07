var async = require('async');

/**
 * Deletes all the data records.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Function} callback Callback passed an Error object (or null if successful), and the deleted models.
 */
exports.deleteAll = function (Model, callback) {
	if (typeof callback !== 'function') {
		callback = function () {};
	}

	// no built-in batch delete, so findAll and manually delete
	Model._query({
		sel: {
			'all': ['id']
		},
		limit: 1000
	}, function (err, results) {
		if (err) {
			return callback(err);
		}
		if (!results || results.length === 0) {
			return callback(null, 0);
		}

		results = results.toArray();

		async.eachLimit(results, 10, function (instance, next) {
			Model._delete(instance, next);
		}, function (err) {
			callback(err, err ? 0 : results.length);
		});
	}, Model);
}
;