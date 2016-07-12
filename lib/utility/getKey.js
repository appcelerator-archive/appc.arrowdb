/**
 * Gets a key from the configuration, taking in to account the currently configured environment.
 * @returns {*|string|string|(function((Array|...string|Object)=))|string}
 */
exports.getKey = function () {
	var env = this.config.env || this.config.environment || 'production';
	return this.config[env + '_key'] || this.config.key;
};
