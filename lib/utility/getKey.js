exports.getKey = function () {
	var env = this.config.env || this.config.environment || 'production';
	return this.config[env + '_key'] || this.config.key;
};
