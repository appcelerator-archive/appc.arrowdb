/**
 * Retrieves the current options to use for the login request for ArrowDB.
 * @returns {{autoSessionManagement: boolean, apiEntryPoint: (*|string)}}
 */
exports.getOpts = function () {
	var env = this.config.env || this.config.environment || 'production';
	return {
		autoSessionManagement: !this.config.requireSessionLogin,
		apiEntryPoint: this.config[env + '_baseurl'] || this.config.baseurl || ''
	};
};
