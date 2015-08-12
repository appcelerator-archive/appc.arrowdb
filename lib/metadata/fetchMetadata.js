var Arrow = require('arrow');

/**
 * Fetches metadata describing your connector's proper configuration.
 * @param next
 */
exports.fetchMetadata = function fetchMetadata(next) {
	next(null, {
		fields: [
			Arrow.Metadata.Text({
				name: 'env',
				description: 'ArrowDB Environment to Use',
				required: false
			}),
			Arrow.Metadata.Text({
				name: 'key',
				description: 'API Key',
				required: false
			}),
			Arrow.Metadata.Text({
				name: 'production_key',
				description: 'API Key for Production',
				required: false
			}),
			Arrow.Metadata.Text({
				name: 'development_key',
				description: 'API Key for Development',
				required: false
			}),
			Arrow.Metadata.URL({
				name: 'baseurl',
				description: 'Base URL',
				required: false
			}),
			Arrow.Metadata.URL({
				name: 'production_baseurl',
				description: 'Base URL for Production',
				required: false
			}),
			Arrow.Metadata.URL({
				name: 'development_baseurl',
				description: 'Base URL for Development',
				required: false
			}),
			Arrow.Metadata.Text({
				name: 'username',
				description: 'username for login',
				required: false
			}),
			Arrow.Metadata.Password({
				name: 'password',
				description: 'password',
				required: false,
				validator: /[a-z\d]{3,}/i
			})
		]
	});
};
