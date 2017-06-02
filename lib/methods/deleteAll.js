const async = require('async')

/**
 * Deletes all the data records.
 * @param {Arrow.Model} Model The model class being deleted.
 * @param {ArrowQueryOptions} options Query options.
 * @param {Function} callback Callback passed an Error object (or null if successful), and the deleted models.
 */
exports.deleteAll = function (Model, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }
  if (typeof callback !== 'function') {
    callback = function () {}
  }

  // Use batch delete if possible
  var currentUser = this.user || this.baseUser
  var isAdminUser = currentUser.admin === 'true'
  var modelSupportsBatchDelete = typeof Model._deleteAll === 'function'
  if (isAdminUser && modelSupportsBatchDelete && this.config.batchOperationsEnabled) {
    return this.invoker('_deleteAll', false, Model, options, callback)
  }
  if (!isAdminUser && modelSupportsBatchDelete) {
    this.logger.debug('Model "' + Model.name + '" supports batch delete but your are not logged in as an admin user.')
    this.logger.debug('Consider performing this action as an admin user for increased performance.')
  }

  // no built-in batch delete, so findAll and manually delete
  Model._query({
    sel: {
      'all': ['id']
    },
    limit: 1000
  }, function (err, results) {
    if (err) {
      return callback(err)
    }
    if (!results || results.length === 0) {
      return callback(null, 0)
    }

    results = results.toArray()

    async.eachLimit(results, 10, function (instance, next) {
      Model._delete(instance, next)
    }, function (err) {
      callback(err, err ? 0 : results.length)
    })
  }, Model)
}
