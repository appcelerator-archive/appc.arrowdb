# API Builder ACS Connector

This is a API Builder connector to ACS.

To install:

```bash
$ api install appc.acs --save
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
var User = APIBuilder.createModel('user',{
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
var User = APIBuilder.createModel('ACSUser',{
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
