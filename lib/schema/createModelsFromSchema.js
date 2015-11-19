var Arrow = require('arrow'),
	ArrowDB = require('arrowdb'),
	dbObjects = ArrowDB.getDBObjects(),
	_ = require('lodash');

/**
 * Creates models from your schema (see "fetchSchema" for more information on the schema).
 */
exports.createModelsFromSchema = function () {
	var self = this,
		objects = self.schema.objects,
		models = {};

	Object.keys(objects).forEach(function (modelName) {
		var object = objects[modelName];
		if (self.hideCoreModels) {
			object.documented = false;
		}

		models[self.name + '/' + modelName] = Arrow.Model.extend(self.name + '/' + modelName, _.merge({
			name: self.name + '/' + modelName,
			autogen: !!self.config.modelAutogen, // Controls if APIs are automatically created for this model.
			connector: self,
			generated: true
		}, object));
	});

	self.models = _.defaults(self.models || {}, models);
};
