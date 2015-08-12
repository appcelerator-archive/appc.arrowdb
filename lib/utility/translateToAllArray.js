var _ = require('lodash');

/**
 * Translates the standard API Builder "sel" and "unsel" syntax (it's based on Mongo's) in to the syntax supported
 * by the ArrowDB queries.
 * @param obj
 * @param includeId
 */
exports.translateToAllArray = function translateToAllArray(obj, includeId) {
	if (_.isString(obj)) {
		var result = {};
		obj.split(',').forEach(function (k) {
			result[k.trim()] = 1;
		});
		obj = result;
	}
	if (!obj.all) {
		obj.all = [];
	}
	for (var key in obj) {
		if (obj.hasOwnProperty(key) && key !== 'all') {
			if (obj[key] == 1) { // jshint ignore:line
				obj.all.push(key);
			}
			delete obj[key];
		}
	}
	// always return the id since we need it for setting the primary key
	if (includeId && obj.all.indexOf('id') < 0) {
		// add it
		obj.all.push('id');
	}
	else if (!includeId) {
		var i = obj.all.indexOf('id');
		if (i !== -1) {
			// remove it
			obj.all.splice(i, 1);
		}
	}
	return obj;
};