# API Builder ACS Connector

This is a API Builder connector to ACS.

> This software is pre-release and not yet ready for usage.  Please don't use this just yet while we're working through testing and finishing it up. Once it's ready, we'll make an announcement about it.

To install:

```bash
$ appc install appc.acs --save
```

Use in your application:

```javascript
var ACS = require('appc.acs'),
	connector = new ACS({
		key: '1234',
		username: 'myname',
		password: 'mypass'
	});
```

Now reference the connector in your model.

```javascript
var User = APIBuilder.Model.extend('user',{
	fields: {
		first_name: {type:'string'},
		last_name: {type:'string'},
		email: {type:'string'},
		role: {type:'string'},
		username: {type:'string'}
	},
	connector: connector
});
```

If you want to map a specific model to a specific collection name, use metadata.  For example, to map the `user` model to the collection `users`, set it such as:

```javascript
var User = APIBuilder.Model.extend('ACSUser',{
	fields: {
		name: {type:'string', required: false, validator: /[a-zA-Z]{3,}/ }
	},
	connector: connector,
	metadata: {
		ACS: {
			object: 'Users'
		}
	}
});
```

# License

This source code is licensed as part of the Appcelerator Enterprise Platform and subject to the End User License Agreement and Enterprise License and Ordering Agreement. Copyright (c) 2014 by Appcelerator, Inc. All Rights Reserved. This source code is Proprietary and Confidential to Appcelerator, Inc.
