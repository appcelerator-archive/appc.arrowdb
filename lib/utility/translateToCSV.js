var _ = require('lodash');

/**
 * Translates the standard API Builder "order" syntax (it's based on Mongo's) in to the syntax supported by the ArrowDB
 * queries.
 * @param obj
 */
exports.translateToCSV = function translateToCSV(obj) {
	if (!_.isObject(obj)) {
		return obj;
	}
	var retVal = '';
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (obj[key] == 1) { // jshint ignore:line
				retVal += key;
			}
			else {
				retVal += '-' + key;
			}
		}
	}
	return retVal;
};
