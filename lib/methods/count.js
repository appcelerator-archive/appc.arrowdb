/* istanbul ignore next */
exports.count = function (Model, options, callback) {
	if (!options || !options.where) {
		// if no where clause, we can just call the count api directly
		return this._count(Model, options, callback);
	}
	// otherwise we need to perform a query and use the count field to get the results
	Model._query({
		where: options.where,
		sel: {'all': ['id']},
		count: true
	}, function (err, result, acsResult) {
		if (err) { return callback(err); }
		if (acsResult && acsResult.body && acsResult.body.meta && acsResult.body.meta.count) {
			return callback(null, acsResult.body.meta.count);
		}
		return callback(null, 0);
	}, Model);
};
