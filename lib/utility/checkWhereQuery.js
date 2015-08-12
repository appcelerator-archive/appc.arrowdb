var _ = require('lodash');

/**
 * Makes sure that the query is valid.
 * @param where
 */
exports.checkWhereQuery = function checkWhereQuery(where) {
	for (var key in where) {
		if (where.hasOwnProperty(key)) {
			var val = where[key];
			if (key === '$regex') {
				if (val.substr(0, 3) === '^.*') {
					throw new Error('ArrowDB $like queries cannot begin with a wildcard.');
				}
			}
			else if (_.isArray(val)) {
				for (var i = 0; i < val.length; i++) {
					if (_.isObject(val[i])) {
						checkWhereQuery(val[i]);
					}
				}
			}
			else if (_.isObject(val)) {
				checkWhereQuery(val);
			}
		}
	}
};
