module.exports = {
	connectors: {
		'appc.arrowdb': {
			/*
			 requireSessionLogin allows you to configure whether or not anonymous requests can use your default
			 account (specified below) for connecting to ArrowDB. Set this to "true" to require requests to specify
			 their own credentials or their own session token (via the headers user, and pass, or sessionCookieString).
			 */
			requireSessionLogin: false,

			key: '', // Your ArrowDB App Key.
			username: '', // A user from your ArrowDB to use for looking up metadata.
			password: '', // The password for your user.

			// Create models for the built in ArrowDB types that can be used in your API.
			generateModelsFromSchema: true,

			// Whether or not to generate APIs based on the methods in generated models. 
			modelAutogen: false
		}
	}
};
