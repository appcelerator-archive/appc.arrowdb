var LRU = require('lru-cache');

/*
 Public API.
 */
exports.cacheInit = init;
exports.reset = reset;

/*
 Implementation.
 */

function init() {
	this.cache = new LRU(this.config.cacheMaxSize || 20);
}

function reset() {
	if (this.cache) {
		this.cache.reset();
	}
	this.db = null;
}