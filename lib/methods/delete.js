/**
 * Deletes the model instance.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Arrow.Instance} instance Model instance.
 * @param {Function} callback Callback passed an Error object (or null if successful), and the deleted model.
 */
exports['delete'] = function (Model, instance, callback) {
	return this.invoker('_delete', false, Model, instance, callback);
};
