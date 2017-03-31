var _ = require('lodash');
/**
 * Finds all model instances.  A maximum of 1000 models are returned.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the models.
 */
exports.findAll = function (Model, callback) {
	var options = {
		limit: 1000
	};

	if(Model.metadata && _.isNumber(Model.metadata.responseJsonDepth)) {
		options.response_json_depth = Model.metadata.responseJsonDepth | 0;
	}

	Model._query(options, callback, Model);
};
