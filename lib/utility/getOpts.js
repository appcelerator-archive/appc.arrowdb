exports.getOpts = function () {
	var env = this.config.env || this.config.environment || 'production';
	return {
		autoSessionManagement: !this.config.requireSessionLogin,
		apiEntryPoint: this.config[env + '_baseurl'] || this.config.baseurl || ''
	};
};
