/**
 * Finds a model instance using the primary key.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {string} id ID of the model to find.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the found model.
 */
exports.findOne = function (Model, id, callback) {
	if (typeof id === 'function') {
		callback = id;
		id = null;
	}

	if (!id) {
		return callback && callback(new Error('Missing required "id"'));
	}

	Model._query({
		limit: 1,
		where: {
			id: id
		}
	}, function (err, results) {
		if (err) {
			callback && callback(err);
		} else if (!results || !results.length) {
			callback && callback();
		} else {
			// some objects (such as ACLs) will return all items from query and we need to then filter
			results = results.filter(function (item) {
				return item.id === id;
			});
			callback && callback(null, results && results[0]);
		}
	}, Model);
};
