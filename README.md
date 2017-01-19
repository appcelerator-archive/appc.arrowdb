# ArrowDB Connector

This is a Arrow connector to ArrowDB.

## Installation

```bash
$ appc install connector/appc.arrowdb
```

## Usage

Reference the connector in your model.

```javascript
var User = Arrow.Model.extend('user', {
	fields: {
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String },
		role: { type: String },
		username: { type: String }
	},
	connector: 'appc.arrowdb'
});
```

If you want to map a specific model to a specific ArrowDB object, use metadata.
For example, to map the `user` model to the ArrowDB object `Users`, set it such as:

```javascript
var User = Arrow.Model.extend('user', {
	fields: {
		name: { type: String, required: false, validator: /[a-zA-Z]{3,}/ }
	},
	connector: 'appc.arrowdb',
	metadata: {
		'appc.arrowdb': {
			object: 'Users'
		}
	}
});
```

### Authenticating Through ArrowDB

You can pass authentication through this connector on to ArrowDB by changing the configuration. To get started,
set `requireSessionLogin` to `true` for the ArrowDB connector:

```javascript
module.exports = {
	connectors: {
		'appc.arrowdb': {
			...
			requireSessionLogin: true
			...
		}
	}
};
```

This property allows you to configure whether or not anonymous requests can use your default account (specified in your
configuration files) for connecting to the server. Set this to "true" to require requests to specify their own
credentials or their own cookie string (via the headers user, and pass, or accesstoken).

With it set to true, call any of the REST APIs on a ArrowDB model, such as User.findAll, and provide credentials
via headers:

```bash
curl --header "user: aUsername" --header "pass: aPassword" http://localhost:8080/api/appc.arrowdb/user
```

The request will execute, and you will either get back an error if the login failed, or you will get the results of the
findAll query. You will also get back the header "sessioncookiestring". For future requests, pass this header back
instead of the user and pass headers. This allows us to re-use the session.

```bash
curl --header "sessioncookiestring: theSessionCookieString" http://localhost:8080/api/appc.arrowdb/user
```

### Batch operations

Since version 1.2.0 the ArrowDB connector supports batch create/delete for certain models. Please refer to [ArrowDB API Documentation](https://docs.appcelerator.com/arrowdb/latest/#!/api) to see which model supports batch operations. You also need to be logged in as an admin user in order to use batch operations on a model that supports them. Batch operations are a huge performance increase when creating or deleting multiple models so make sure to utilize them when they are available.

Due to a slightly changed behavior you need to explicitly enable the usage of batch operations in your existing project. To enabled them add `batchOperationsEnabled: true` to your ArrowDB connector configuration file. For new Arrow projects, or when you install the connector for the first time, batch operations will be enabled automatically.

**Changed behavior with batch operations**
*   `Model.create` has a default limit of 100 models that can be created in a single batch operation. Trying to create more than that limit will result in an error and no models will be created at all. The value of `result` in the callback function also differs in that it will report how many items the batch operation `received` and how many were successfully `inserted` instead of returning the created model instance.
*   `Model.deleteAll` has a default limit of 100.000 models that can be deleted in a single batch operation. Models will be deleted asynchronously in a different process by ArrowDB. This means that even though the callback will be called the deletion might still be in progress. Use a polling approach with `Model.count` to see when all objects actually are deleted.

## Development

> This section is for individuals developing the ArrowDB Connector and not intended
  for end-users.

```bash
npm install
node app.js
```

### Running Unit Tests

```bash
npm test
```


# Contributing

This project is open source and licensed under the [Apache Public License (version 2)](http://www.apache.org/licenses/LICENSE-2.0).  Please consider forking this project to improve, enhance or fix issues. If you feel like the community will benefit from your fork, please open a pull request.

To protect the interests of the contributors, Appcelerator, customers and end users we require contributors to sign a Contributors License Agreement (CLA) before we pull the changes into the main repository. Our CLA is simple and straightforward - it requires that the contributions you make to any Appcelerator open source project are properly licensed and that you have the legal authority to make those changes. This helps us significantly reduce future legal risk for everyone involved. It is easy, helps everyone, takes only a few minutes, and only needs to be completed once.

[You can digitally sign the CLA](http://bit.ly/app_cla) online. Please indicate your email address in your first pull request so that we can make sure that will locate your CLA.  Once you've submitted it, you no longer need to send one for subsequent submissions.



# Legal Stuff

Appcelerator is a registered trademark of Appcelerator, Inc. Arrow and associated marks are trademarks of Appcelerator. All other marks are intellectual property of their respective owners. Please see the LEGAL information about using our trademarks, privacy policy, terms of usage and other legal information at [http://www.appcelerator.com/legal](http://www.appcelerator.com/legal).
