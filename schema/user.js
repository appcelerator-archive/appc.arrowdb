'use strict';

/*
 The Users model.
 */
module.exports = {
	name: 'user',
	objectName: 'Users',

	/**
	 * Remove _syncModelsCanUpdateThis property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	_syncModelsCanUpdateThis: false,
	/*
	 Fields for this model.
	 */
	fields: {
		"email": {
			// "originalType": "String",
			"type": String,
			"description": "User's email address.\n\nFor security, this field is not shown unless you have admin access.\n"
		},
		"username": {
			// "originalType": "String",
			"type": String,
			"description": "User's login name."
		},
		"first_name": {
			// "originalType": "String",
			"type": String,
			"description": "User's first name."
		},
		"last_name": {
			// "originalType": "String",
			"type": String,
			"description": "User's last name"
		},
		"role": {
			// "originalType": "String",
			"type": String,
			"description": "User's role."
		},
		"admin": {
			// "originalType": "Boolean",
			"type": Boolean,
			"description": "Set to true if the user is an application admin."
		},
		"external_accounts": {
			// "originalType": "Array",
			"type": Array,
			"description": "List of external accounts associated with this user. Each account is represented\nby a Hash with the following properties:\n\n*   `external_id: String`. External account ID.\n*   `external_type: String`. Account type, for example, \"facebook\".\n*   `token: String`. External account login token.\n"
		},
		"photo": {
			// "originalType": "Photos",
			"type": Array,
			"description": "Primary photo for this user."
		},
		"created_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Creation date for this user object."
		},
		"updated_at": {
			// "originalType": "Date",
			"type": Date,
			"description": "Last update time for this user object."
		},
		"friend_counts": {
			// "originalType": "Hash",
			"type": Object,
			"description": "Dictionary describing the number of friends the user has.  Possible keys returned are:\n\n  * `requests`: number of pending friend requests.\n  * `friends`: number of friends if two-way friendship is enabled.\n  * `following`: number of friends being followed by the user if one-way friendship is enabled.\n  * `follows`: number of friends following the user if one-way friendship is enabled.\n"
		},
		"custom_fields": {
			// "originalType": "",
			"type": Object,
			"description": "User defined fields."
		},
		"user_id": {
			// "originalType": "",
			"type": String,
			"description": "Specifies the owner of object."
		},
		//NOTE: added manually
		password: {type: String, hidden: true},
		password_confirmation: {type: String, hidden: true, copy_field: 'password'}
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"query": {
			"summary": "Custom Query of Users",
			"description": "Custom query of Users objects with sorting and paginating. You can query on sort\nbased on the data in any of the standard User fields. You can also query and\nsort data based on the values of any custom fields, if the values are simple JSON\nvalues.\n\nFor security reasons, when querying for Users the email field is not returned\nin each Users object unless you have [admin access](http://docs.appcelerator.com/arrowdb/latest/#!/guide/admin_access).\n\nCurrently you **cannot** sort or query based on data stored inside array or hash\nobjects in custom fields.\n\nIn ACS 1.1.5 and later, you can paginate query results using `skip` and `limit` parameters, or by including\na `where` clause to limit the results to objects whose IDs fall within a specified range.\nFor details, see [Query Pagination](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query-section-query-pagination).\n\nFor details about using the query parameters,\nsee the [Search and Query guide](http://docs.appcelerator.com/arrowdb/latest/#!/guide/search_query).\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "page",
					"description": "\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "\nStarting in ACS 1.1.5, page and per_page are no longer supported in query operations. \nApplications should instead use skip and limit \nquery parameters.\n",
					"type": "Number"
				},
				{
					"name": "limit",
					"description": "The number of records to fetch. The value must be greater than 0, and no greater than \n1000, or an HTTP 400 (Bad Request) error will be returned. Default value of `limit` is 10.\n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "The number of records to skip. The value must be greater than or equal to 0, and no greater \nthan 4999, or an HTTP 400 error will be returned. To skip 5000 records or more \nyou need to perform a range-based query. See \nQuery Pagination for more information.\n",
					"type": "Number"
				},
				{
					"name": "where",
					"description": "Constraint values for fields. `where` should be encoded JSON.\n\nIf `where` is not specified, `query` returns all objects.\n",
					"type": "Hash"
				},
				{
					"name": "order",
					"description": "Sort results by one or more fields.\n",
					"type": "String"
				},
				{
					"name": "sel",
					"description": "Selects the object fields to display. Do not use this parameter with `unsel`.\n",
					"type": "Hash"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true**, each User object in the response includes `\"current_user_liked: true\"`\n if the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "unsel",
					"description": "Selects the object fields NOT to display. Do not use this parameter with `sel`.\n",
					"type": "Hash"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"update": {
			"summary": "",
			"description": "Any of the same parameters as create can be\nused to update the current user. If `password` is updated then\n`password_confirmation` must be sent as well.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "email",
					"description": "Email address.",
					"type": "String"
				},
				{
					"name": "username",
					"description": "User name.",
					"type": "String"
				},
				{
					"name": "password",
					"description": "Password.",
					"type": "String"
				},
				{
					"name": "password_confirmation",
					"description": "Password.",
					"type": "String"
				},
				{
					"name": "first_name",
					"description": "First name.",
					"type": "String"
				},
				{
					"name": "last_name",
					"description": "First name.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to assign as the user's primary photo.\n\nWhen you use `photo` parameter to attach a new photo, you can use it with\n[custom resize and sync options](/docs/photosizes)\n\nTo remove primary photo, simply set \"photo=\" or \"photo_id=\". If the original\nphoto was created by using `photo` parameter, the photo will be deleted.\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to use as the user's primary photo.\n\nTo remove primary photo, simply set \"photo=\" or \"photo_id=\". If the original\nphoto was created by using `photo` parameter, the photo will be deleted.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated tags, overwrites the existing tags. For example, \"hiking,swimming\".\n",
					"type": "String"
				},
				{
					"name": "custom_fields",
					"description": "User-defined data. See [Custom Data Fields](/docs/customfields).\n",
					"type": "String"
				},
				{
					"name": "acl_name",
					"description": "Name of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "su_id",
					"description": "User ID to update this user on behalf of.\nThe current login user must be an application admin to update a user on behalf of another user.",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"login": {
			"summary": "Login User",
			"description": "Log a user in using their ACS credentials.\n\nTo log a user in using an external account, see {@link\nSocialIntegrations#external_account_login External Account Login}.\n\nTo log a user out, see logout.\n\nUser login sessions expire after they have been unused for three months.\nIf the application saves and uses a persistent reference to the user login session, and the\nuser session expires, any ACS call that requires a user login will return a 404 error.\nYour application needs to handle an invalid user session error, such as prompting the user\nto log in.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "login",
					"description": "Email address or username of the user to login.",
					"type": "String"
				},
				{
					"name": "password",
					"description": "User's password.",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"search": {
			"summary": "Search Users",
			"description": "Returns the list of users that have been added to the app, sorted by search\nrelevancy.\n\nOptionally, `q` can be given to perform full text search on user's first name,\nlast name, email address, username and tags. For security reasons, when searching for Users\nthe email field is not returned in each Users object unless you have \n[admin access](http://docs.appcelerator.com/arrowdb/latest/#!/guide/admin_access).\n\nFor advanced custom search, see query.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "page",
					"description": "Request page number, default is 1.",
					"type": "Number"
				},
				{
					"name": "per_page",
					"description": "Number of results per page, default is 10.",
					"type": "Number"
				},
				{
					"name": "q",
					"description": "Space-separated list of keywords, used to perform full text search on first name, last name, email address,\nusername and tags fields.\n",
					"type": "String"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"logout": {
			"summary": "Logout User",
			"description": "Log out a user.",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "device_token",
					"description": "If specified, all push subscriptions associated with this device token are\ncanceled. See the \"Push Notifications\" section in the\n[Android SDK guide](#!http://docs.appcelerator.com/arrowdb/latest/#!/guide/android) for more information.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"requestResetPassword": {
			"summary": "Send a reset password email to User",
			"description": "Sends an email to a user containing a link to recover a lost password. You can use the default\nemail template provided by ACS, or specify a [custom email template](http://docs.appcelerator.com/platform/latest/#!/guide/Managing_Email_Templates-section-37548619_ManagingEmailTemplates-Creatinganemailtemplate) \nthat you have created. When using a custom email template, the email must contain a properly\nformatted URL, as explained in the `template` method parameter documentation below.\n\nYou must also have configured your application's [email settings](http://docs.appcelerator.com/platform/latest/#!/guide/Configuring_Cloud_Services-section-39683049_ConfiguringCloudServices-Email) \nin Appcelerator Dashboard or [community web console](http://my.appcelerator.com/apps).\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "email",
					"description": "Email address. Must match the user's registered email address.",
					"type": "String",
					"required": true
				},
				{
					"name": "subject",
					"description": "The default subject of the password reset email is \"Password reset request for\n{{your app name}}\". If you wish to have your custom email subject, you can\nprovide it by setting the subject parameter\n",
					"type": "String"
				},
				{
					"name": "template",
					"description": "If you wish to use your custom email body. You can create a email template and\npass the template name. The email must contain a properly formatted link to the password\nreset URL on appcelerator.com, or a link on your own site, as follows:\n\n\n**For Appcelerator Platform subscribers (enterprise users)**, to link directly to the password page on appcelerator.com, your email template must contain a link to the following\nURL:\n\n    https://dashboard.appcelerator.com/#/users/confirmation/{{key}}/{{confirmation_token}}\n\n**Community users** must use the following URL:\n\n    https://cloud.appcelerator.com/users/reset_password?key={{key}}&reset_password_token={{reset_password_token}}\n\nIf you prefer the user to reset their password on your own website, rather than on appcelerator.com,\nyou must provide a URL with the following format:\n\n    https://[your_url.com]/[your_method]?reset_password_token={{reset_password_token}}\n\nThis page must cache the value of the `reset_password_token` parameter and present a form \nthat allows the user to enter a new password and password confirmation.\nWhen the user submits the form, the app server must make the following call to Appcelerator Cloud Services API to reset the\npassword, passing the original password reset token, the user's new password, and the password confirmation:\n\n    GET https://api.cloud.appcelerator.com/v1/users/reset_password.json?key=&reset_password_token={{reset_password_token}}&password={{password}} &password_confirmation={{password_confirmation}}\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"delete": {
			"summary": "Delete User",
			"description": "A user must already be logged in to their account to delete it. Any Friends-related\ndata and push notification subscriptions associated with the user are also deleted.\n\nThe user's associated primary photo is not deleted.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"showMe": {
			"summary": "Show Current User Profile",
			"description": "Shows both public and private user information about the user who is\ncurrently logged in.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"resendConfirmation": {
			"summary": "Re-send user email verification.",
			"description": "If you enabled new user account email verification in your App settings, all\nnew users will receive an email containing instructions to activate their\naccount. You can use this API to re-send user verification email.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "email",
					"description": "Email must match user's registered email.",
					"type": "String",
					"required": true
				},
				{
					"name": "confirmation_subject",
					"description": "The default subject of the email verification is \"Email Verification\nInstructions for {{your app name}}\". If you wish to have your custom email\nsubject, you can provide it by setting the `confirmation_subject` parameter.\n",
					"type": "String"
				},
				{
					"name": "confirmation_template",
					"description": "If you wish to use your custom email body. You can create a email template and\npass the template name. Your email template must contain the following URL to\nallow users to be redirected to Appcelerator Cloud Services email verification page:\n\n    https://cloud.appcelerator.com/users/confirmation?key={{key}}&confirmation_token={{confirmation_token}}\n\nIf you have your own website that talks to Appcelerator Cloud Services backend\nand wish to use custom URL, you must provide a URL with the following format:\n\n    https://[your_url.com]/[your_method]?key={{key}}&confirmation_token={{confirmation_token}}\n\nWhen a user visits the above URL, you make a call to Appcelerator Cloud\nServices to confirm the user internally from your web server:\n\n    GET https://api.cloud.appcelerator.com/v1/users/confirm_user.json?confirmation_token={{confirmation_token}}&key=\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"show": {
			"summary": "Show User Profile",
			"description": "Shows public user information. For private information about the currently\nlogged in user, see Show Logged In User Info.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "user_id",
					"description": "User ID of the user to show. Either `user_id` or `user_ids` must be specified.\n",
					"type": "String"
				},
				{
					"name": "user_ids",
					"description": "Comma-separated list of user IDs to show. Either `user_id` or `user_ids` must be specified.\n",
					"type": "String"
				},
				{
					"name": "response_json_depth",
					"description": "Nested object depth level counts in response json.\n\nIn order to reduce server API calls from an application, the response json may\ninclude not just the objects that are being queried/searched, but also with\nsome important data related to the returning objects such as object's owner or\nreferencing objects.\n\nDefault is 1, valid range is 1 to 8.\n",
					"type": "Number"
				},
				{
					"name": "show_user_like",
					"description": "If set to **true** the User object in the response will include `\"current_user_liked: true\"`\nif the current user has liked the object. If the user has not liked the object, the \n`current_user_liked` field is not included in the response.\n",
					"type": "Boolean"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"batchDelete": {
			"summary": "Deletes multiple Users objects.",
			"description": "Deletes Users objects that match the query constraints provided in the `where` parameter.\nIf no `where` parameter is provided, all Users objects are deleted. \nNote that an HTTP 200 code (success)\nis returned if the call completed successfully but the query matched no objects.\n\nFor performance reasons, the number of objects that can be deleted in a single batch delete \noperation is limited to 100,000.\n\nThe matched objects are deleted asynchronously in a separate process.      \n\nThe primary photos associated with the matched objects are \nnot deleted. \n\nYou must be an application admin to run this command.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "where",
					"description": "Encoded JSON object that specifies constraint values for Users objects to delete.\nIf not specified, all Users objects are deleted.\n",
					"type": "Hash"
				}
			]
		},
		"create": {
			"summary": "Creates a user.",
			"description": "Creates a new user.\n\nWhen creating a user, you must specify either:\n\n*   username\n*   email address, first name, and last name\n\nA user can have both an email address and username specified. However, if username\nis omitted, email address, first name and last name are required.\n\nFor regular users (non-admin users), after successully executing this command, you will be logged\nin as the new user and the session ID will be associated with the newly created user.  For\nexample, when user A creates user B, user A is now logged in as user B and user A's session\nID belongs to user B.\n\nFor admin users, you will still be logged in as the admin user.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "email",
					"description": "User's email address. Required if `username` is not specified.",
					"type": "String"
				},
				{
					"name": "username",
					"description": "User's login name. Required if `email` is not specified.\n\nIf `username` is not specified, `email`, `first_name`, and `last_name` must be included.\n",
					"type": "String"
				},
				{
					"name": "password",
					"description": "User's password.",
					"type": "String",
					"required": true
				},
				{
					"name": "password_confirmation",
					"description": "Copy of user's password for confirmation.",
					"type": "String",
					"required": true
				},
				{
					"name": "first_name",
					"description": "User's first name. Required when `username` is not provided.",
					"type": "String"
				},
				{
					"name": "last_name",
					"description": "User's last name. Required when `username` is not provided.",
					"type": "String"
				},
				{
					"name": "photo",
					"description": "New photo to attach as the primary photo for the user.\n\nWhen you use the `photo` parameter to attach a new photo, you can use the\n[custom resize and sync options](http://docs.appcelerator.com/arrowdb/latest/#!/guide/photosizes).\n",
					"type": "Photos"
				},
				{
					"name": "photo_id",
					"description": "ID of an existing photo to attach as the primary photo for the user.\n",
					"type": "String"
				},
				{
					"name": "tags",
					"description": "Comma separated list of tags for this user.\n",
					"type": "String"
				},
				{
					"name": "custom_fields",
					"description": "User defined fields. See [Custom Data Fields](http://docs.appcelerator.com/arrowdb/latest/#!/guide/customfields).",
					"type": [
						"String",
						"Hash"
					]
				},
				{
					"name": "acl_name",
					"description": "Name of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "acl_id",
					"description": "ID of an ACLs to associate with this object.\n\nAn ACL can be specified using `acl_name` or `acl_id`. The two parameters are\nmutually exclusive.\n",
					"type": "String"
				},
				{
					"name": "role",
					"description": "String representation of user role, for example, \"teacher\".",
					"type": "String"
				},
				{
					"name": "template",
					"description": "Send a congratulation email to notify that the user has been created successfully.\n\nYou need to create an email template and pass the template name.\n",
					"type": "String"
				},
				{
					"name": "confirmation_template",
					"description": "If \"New User Email Verification\" is enabled for the application, ACS sends a confirmation email to\nthe user.\n\nIf you don't pass the `confirmation_template` parameter, then ACS sends a default\nconfirmation email.\n\nIf you wish to use your custom email body, you can create a email template and pass\nthe template name. Your email template must contain the following URL to allow users\nto be redirected to Appcelerator Cloud Services email verification page:\n\n     https://cloud.appcelerator.com/users/confirmation?key={{key}}&confirmation_token={{confirmation_token}}\n\nIf you have your own website that talks to Appcelerator Cloud Services backend and\nwish to use custom URL, you must provide a URL with the following format:\n\n     https:///?key={{key}}&confirmation_token={{confirmation_token}}\n\nWhen a user visits the above URL, you call the ACS `users/confirm_user.json` method to \nconfirm the user internally from your web server:\n\n     GET https://api.cloud.appcelerator.com/v1/users/confirm_user.json?confirmation_token={{confirmation_token}}&key=\n\n**Enterprise users** must append the query parameter `&ct=enterprise` to the end of the URL:\n\n     GET https://api.cloud.appcelerator.com/v1/users/confirm_user.json?confirmation_token={{confirmation_token}}&key=&ct=enterprise\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"remove": {
			"canonical": "delete"
		}

	},

	_prepareParams: function prepareParams(method, instance, params, defaultValue) {
		params || (params = {});
		switch (method) {
			//NOTE: added manually
			case 'login':
				return {
					login: params.username,
					password: params.password
				};
			case 'update':
				defaultValue.su_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					su_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: ["read", "update", "delete", "create"]
};
