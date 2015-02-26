/*
 This script will sync the models with the latest documentation from ACS.
 Check out the README.md for more information.
 */

if (!process.env.GITHUB_TOKEN) {
	console.error('The GITHUB_TOKEN=your_personal_github_token env arg is required for this script.');
	process.exit(1);
}

/*
 Deps.
 */
var yaml = require('js-yaml'),
	_ = require('lodash'),
	fs = require('fs'),
	os = require('os'),
	path = require('path'),
	https = require('https'),
	urlLib = require('url');

/*
 Configuration.
 */
var excludedFields = ['id'],
	excludedMethods = ['count'],
	excludedObjects = [],
	// fields that aren't in our documentation but should exist in the data model
	includeFields = [{
		name: 'custom_fields',
		type: 'Object',
		description: 'User defined fields.'
	},{
		name: 'user_id',
		type: 'String',
		description: 'Specifies the owner of object.'
	}];

/*
 State.
 */
var cache = process.env.CACHE || false,
	repo = 'appcelerator/cloud_docs',
	apiEndpoint = 'https://api.github.com/repos/' + repo + '/contents/',
	rawEndpoint = 'https://raw.githubusercontent.com/' + repo + '/master/',
	template = _.template(fs.readFileSync(path.join(__dirname, 'template.ejs')), undefined, { variable: 'data' }),
	header = 'x-oauth-basic',
	token = process.env.GITHUB_TOKEN;

var downloading = 0,
	objects = {};

console.log('Download the directory listing for apidoc.');
downloading += 1;
grab(apiEndpoint + 'apidoc', downloadedJSON);

/**
 * Handles a downloaded directory listing from GitHub, recursively downloading each directory within it, and
 * downloading any contained YAML files.
 * @param body
 */
function downloadedJSON(body) {
	downloading -= 1;
	var files = JSON.parse(body);
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		if (file.type === 'dir') {
			console.log('Recursing into ' + file.path + '.');
			downloading += 1;
			grab(apiEndpoint + file.path, downloadedJSON);
		}
		else {
			console.log('Parsing ' + file.path + '.');
			downloading += 1;
			grab(rawEndpoint + file.path, downloadedYAML);
		}
	}
	checkDone();
}

/**
 * Handles a downloaded YAML file, parsing it and mixing it in to our store of objects.
 * @param body
 */
function downloadedYAML(body) {
	downloading -= 1;
	// Strip out links and HTML (for now).
	body = body
		.replace(/<[^>]+>/g, '')
		.replace(/\{@link\s([^ ]+)\}/g, '$1')
		.replace(/\{@link\s[^ ]+\s([^}]+?)\}/g, '$1');
	// Load the doc.
	var doc = yaml.safeLoad(body),
		object = objects[doc.name] = objects[doc.name] || {
			name: doc.name
		};

	// Should we log additional info on the doc for development purposes?
	if (process.env.LOG_KEY && process.env.LOG_KEY === doc.name) {
		console.log('------------------------------------------------------------------');
		console.log('- Parsed YAML Doc');
		console.log('------------------------------------------------------------------');
		console.log(require('util').inspect(doc, false, null));
		console.log('------------------------------------------------------------------');
	}

	// Concat methods.
	if (doc.methods) {
		object.methods = (object.methods || []).concat(doc.methods);
		object.methods = object.methods.filter(excludeCertainMethods);
	}

	// Concat fields.
	if (doc.fields) {
		for (var i = 0; i < doc.fields.length; i++) {
			var field = doc.fields[i];
			field.type = translateType(String(field.originalType = field.type));
		}
		object.fields = (object.fields || []).concat(doc.fields).concat(includeFields).filter(excludeCertainFields);
	}

	// Check if its private (such as "Reviewable" and other future mixins).
	if (doc.private) {
		object.private = true;
	}

	// Check if a mixin is used.
	if (doc.mixin) {
		object.mixin = doc.mixin;
	}

	checkDone();
}

/**
 * Returns true if the field is truthy and isn't in our exclusion list.
 * @param field
 * @returns {*|boolean}
 */
function excludeCertainFields(field) {
	return field && excludedFields.indexOf(field.name) === -1;
}

/**
 * Returns true if the method is truthy and isn't in our exclusion list.
 * @param method
 * @returns {*|boolean}
 */
function excludeCertainMethods(method) {
	return method && excludedMethods.indexOf(method.name) === -1;
}

/**
 * Translate
 * @param type
 * @returns {*}
 */
function translateType(type) {
	if (['Array', 'String', 'Date', 'Number', 'Boolean'].indexOf(type) >= 0) {
		// No change necessary.
		return type;
	}
	if (type.indexOf('Array<') === 0
		|| type.indexOf('Collections') > 0
		|| type.slice(-1) === 's') {
		return 'Array';
	}
	if (type === 'Hash'
		|| type == 'String,BinaryData'
		|| type === 'String,Hash') {
		return 'Object';
	}

	console.error('Unknown type encountered: "' + type + '".');
	process.exit(1);
}

/**
 * Sees if we are done with all downloads, and if so, begins writing models.
 */
function checkDone() {
	if (downloading === 0) {
		console.log('All necessary information has been downloaded.');
		console.log('Writing out models.');
		writeModels();
	}
}

/**
 * Well... it writes out the models. Stop acting so surprised!
 */
function writeModels() {
	for (var key in objects) {
		if (objects.hasOwnProperty(key)) {
			var object = objects[key];
			// Is it private?
			if (object.private) {
				console.log('Skipping ' + key + ' because it is flagged "private".');
				continue;
			}
			if (excludedObjects.indexOf(key)!==-1) {
				console.log('Skipping ' + key + ' because it is marked as excluded.');
				continue;
			}
			// Does it use a mixin?
			if (object.mixin) {
				var mixin = objects[object.mixin];
				if (mixin.methods) {
					object.methods = (object.methods || []).concat(mixin.methods);
				}
				if (mixin.fields) {
					object.fields = (object.fields || []).concat(mixin.fields);
				}
			}
			// Should we log additional info on the object for development purposes?
			if (process.env.LOG_KEY && process.env.LOG_KEY === key) {
				console.log('------------------------------------------------------------------');
				console.log('- Generated Object');
				console.log('------------------------------------------------------------------');
				console.log(require('util').inspect(object, false, null));
				console.log('------------------------------------------------------------------');
			}

			// Calculate what our model should be.
			var fileName = object.fileName = translateObjectNameToFileName(key),
				modelPath = path.join(__dirname, '../models/', fileName + '.js'),
				newContents = template(object);

			// Sync up the model with the filesystem, based on the existing contents.
			if (fs.existsSync(modelPath)) {
				var currentContents = fs.readFileSync(modelPath, 'utf8');
				if (currentContents.indexOf('_syncModelsCanUpdateThis:true') >= 0 ||
					currentContents.indexOf('_syncModelsCanUpdateThis: true') >= 0) {
					if (newContents !== currentContents) {
						fs.writeFileSync(modelPath, newContents);
						console.log('Updated ' + key + '.');
					}
					else {
						console.log('No changes to ' + key + '.');
					}
				}
				else {
					console.log('Skipping model generation for ' + key + ' because it does not specify _syncModelsCanUpdateThis: true.');
				}
			}
			else {
				fs.writeFileSync(modelPath, newContents);
				console.log('Created ' + key + '.');
			}
		}
	}
}

/**
 * Turns the provided object name, such as KeyValues, to the desired file & model name, such as key_value.
 * @param objectName
 * @returns {string}
 */
function translateObjectNameToFileName(objectName) {
	return objectName
		.replace(/^([A-Z]+)/, function(char) { return char.toLowerCase(); })
		.replace(/([A-Z]+)/g, function(char) { return '_' + char.toLowerCase(); })
		.replace(/s$/, '')
		.replace(/se$/, 's');
}

/*
 Utility.
 */

/**
 * Calculates an MD5 hash for the provided string.
 * @param str
 * @returns {*}
 */
function md5(str) {
	return require('crypto').createHash('md5').update(str).digest('hex');
}

/**
 * Downloads from the provided URL, returning the final resulting string to "callback". If env.CACHE is truthy, this
 * response will be cached on the local filesystem based on the provided URL.
 * @param url
 * @param callback
 */
function grab(url, callback) {
	var tempPath = path.join(os.tmpdir(), md5(url));
	if (cache && fs.existsSync(tempPath)) {
		setTimeout(function() {
			callback(fs.readFileSync(tempPath, 'utf8'));
		}, 1);
		return;
	}
	url = urlLib.parse(url);
	url.auth = header + ':' + token;
	url.headers = {
		'User-Agent': 'appcelerator'
	};
	https.get(url, function(res) {
		var body = '';
		res.on('data', function(chunk) { if (chunk) { body += chunk; } });
		res.on('end', function() {
			if (cache) {
				fs.writeFileSync(tempPath, body);
			}
			callback(body);
		});
	});
}