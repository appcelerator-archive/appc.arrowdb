var async = require('async');

/**
 * Creates multiple models.
 *
 * Utilizes batch operation if available or falls back to the default connector
 * implementation and manually creates models one by one.
 *
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Array<Object>} values Array of attributes to set on the new models.
 * @param {Function} callback Callback passed an Error object (or null if successful), and info about the batch operation.
 * @throws {Error}
 */
exports.createMany = function (Model, values, callback) {
	// Use batch delete if possible
	var currentUser = this.user || this.baseUser;
	var isAdminUser = currentUser.admin === 'true';
	var modelSupportsBatchCreate = typeof Model.createMany === 'function';
	if (isAdminUser && modelSupportsBatchCreate && this.config.batchOperationsEnabled) {
		return this.invoker('createMany', false, Model, values, callback);
	}
	if (!isAdminUser && modelSupportsBatchCreate) {
		this.logger.debug('Model "' + Model.name + '" supports batch create but your are not logged in as an admin user.');
		this.logger.debug('Consider performing this action as an admin user for increased performance.');
	}

	// No batch create, manually create
	var invokeCreate = async.apply(this.invoker.bind(this), '_create', false, Model);
	async.mapLimit(values, 4, invokeCreate, callback);
};
