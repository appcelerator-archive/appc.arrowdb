module.exports = {
	connectors: {
		'appc.arrowdb': {
			key: '', // Place your ArrowDB App Key
			username: '', // A user from your ArrowDB to use for looking up metadata.
			password: '', // The password for your user.

			generateModelsFromSchema: true // Generate models for the built in ArrowDB types (ACLs, Users, etc).
		}
	}
};