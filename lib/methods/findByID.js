/**
 * Finds a model instance using the primary key.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {String} id ID of the model to find.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the found model.
 */
exports.findByID = function (Model, id, callback) {
	if (typeof id === 'function') {
		callback = id;
		id = null;
	}

	if (typeof callback !== 'function') {
		callback = function () {};
	}

	if (!id) {
		return callback(new Error('Missing required "id"'));
	}

	var options = {
		limit: 1,
		where: {
			id: id
		}
	};

	if(Model.metadata && typeof Model.metadata.response_json_depth !== 'undefined') {
		options.response_json_depth = Model.metadata.response_json_depth | 0;
	}

	Model._query(options, function (err, results) {
		if (err) {
			callback(err);
		} else if (!results || !results.length) {
			callback();
		} else {
			// some objects (such as ACLs) will return all items from query and we need to then filter
			results = results.filter(function (item) {
				return item.id === id;
			});
			callback(null, results && results[0]);
		}
	}, Model);
};
