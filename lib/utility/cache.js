var LRU = require('lru-cache');

/*
 Public API.
 */
exports.cacheInit = init;
exports.reset = reset;

/*
 Implementation.
 */

/**
 * Initializes a LRU cache for use in this connector.
 */
function init() {
	this.cache = new LRU(this.config.cacheMaxSize || 20);
}

/**
 * Resets the cache, and nullifies the db instance.
 */
function reset() {
	if (this.cache) {
		this.cache.reset();
	}
	this.db = null;
}
