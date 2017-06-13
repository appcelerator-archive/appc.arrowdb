const ArrowDB = require('arrowdb')

/**
 * login is called only if loginRequired calls next with the args (null, true). It looks at the current req, and
 * either logs the user in (based on credentials provided in headers) or returns an error. It can return a session
 * token via a res header so that future requests don't have to provide credentials.
 */
exports.login = function login (request, response, next) {
  var self = this
  var headers = request.headers || {}
  var opts = this.getOpts()
  var key = this.getKey()
  var username = headers.user
  var password = headers.pass

  // Remove the db from cache and from the connector variables
  function deleteDb () {
    self.db = null

    if (self.baseContext && self.baseContext.db) {
      self.baseContext.db = null
    }

    if (self.cache &&
      request.headers &&
      typeof request.headers.sessioncookiestring !== 'undefined' &&
      request.headers.sessioncookiestring !== null) {
      self.cache.set(request.headers.sessioncookiestring, null)
    }
  }

  // login to get the user and make sure this session is valid
  // but only do it once for a session
  if (this.db && !username && !password && !request.cookies.arrowdbuid && this.config.requireSessionLogin !== true) {
    if (this.db.arrowdbuid) {
      // we already have it
      return next()
    }
    return this.db.usersShowMe(function (err, result) {
      if (err) {
        deleteDb()
        return next('Authentication is required. Invalid or expired sessionCookieString header passed.')
      }
      self.user = result && result.body && result.body.response && result.body.response.users && result.body.response.users[0]
      self.db.arrowdbuid = self.user.id
      response.cookie.call(response.response || response, 'arrowdbuid', self.user.id)
      next()
    })
  }

  if (!username || !password) {
    if (this.config.requireSessionLogin === true) {
      deleteDb()
      return next('Authentication is required. Please pass these headers: user, and pass; or sessionCookieString.')
    } else {
      return next()
    }
  }

  this.db = this.baseContext.db = new ArrowDB(key, opts)
  this.db.usersLogin({
    login: username,
    password: password
  }, function loginCallback (err, result) {
    if (err) {
      deleteDb()
      return next(err)
    }

    self.user = result.body.response.users[0]
    if (self.baseContext) {
      self.baseContext.user = self.user
    }
    response.header('sessionCookieString', result.cookieString)
    self.db.sessionCookieString = self.baseContext.db.sessionCookieString = result.cookieString
    return next()
  })
}
