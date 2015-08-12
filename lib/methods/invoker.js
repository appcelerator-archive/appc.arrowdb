var Arrow = require('arrow');

/**
 * Helper function that returns the handler for crud methods.
 *
 * @param {string} method - The actual method to invoke.
 * @param {boolean} isInstance - When true, configures the handler to accept a
 *      model Instance. Otherwise the handler treats it as an options object.
 * @param {Model} Model - The model invoking the specified method.
 * @param {Instance|object} obj - An Instance or object to be passed to the real method.
 * @param {function} callback - A function to call after the method has completed.
 * @returns {function}
 */
exports.invoker = function invoker(method, isInstance, Model, obj, callback) {
	var self = this;

	if (isInstance) {
		if (!(obj instanceof Arrow.Instance)) {
			return callback(new Error('Invalid instance'));
		}
		if (obj._deleted) {
			return callback(new Error('Invalid has already been deleted'));
		}
	} else {
		if (typeof obj === 'function') {
			callback = obj;
			obj = {};
		}
		if (obj instanceof Arrow.Instance && obj._deleted) {
			return callback(new Error('Invalid has already been deleted'));
		} else if (typeof obj !== 'object') {
			obj = {};
		}
	}

	if (typeof callback !== 'function') {
		callback = function () {};
	}

	if (method === '_query' && obj) {
		if (obj.sel) { obj.sel = self.translateToAllArray(obj.sel, 1); }
		if (obj.unsel) { obj.unsel = self.translateToAllArray(obj.unsel); }
		if (obj.order) { obj.order = self.translateToCSV(obj.order); }
		if (obj.where) { self.checkWhereQuery(obj.where); }
		if (obj.limit) { self.checkLimit(obj.limit); }
	}

	// try to invoke the requested method
	if (typeof Model[method] !== 'function' || (Model.methodMeta && Model.methodMeta[method] && Model.methodMeta[method].disabled)) {
		return callback(new TypeError('unsupported method "' + method.replace(/^_/, '') + '"'));
	}

	// run the method
	Model[method].call(Model, obj, callback, Model);
};
