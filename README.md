# ArrowDB Connector

This is a Arrow connector to ArrowDB.

> This software is pre-release and not yet ready for usage. Please don't use
  this just yet while we're working through testing and finishing it up. Once
  it's ready, we'll make an announcement about it.

## Installation

```bash
$ appc install connector/appc.arrowdb --save
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

If you want to map a specific model to a specific collection name, use metadata.
For example, to map the `user` model to the collection `users`, set it such as:

```javascript
var User = Arrow.Model.extend('user',{
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

## License

This source code is licensed as part of the Appcelerator Enterprise Platform and
subject to the End User License Agreement and Enterprise License and Ordering
Agreement. Copyright (c) 2014-2015 by Appcelerator, Inc. All Rights Reserved. This
source code is Proprietary and Confidential to Appcelerator, Inc.
