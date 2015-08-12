'use strict';

/*
 The Emails model.
 */
module.exports = {
	name: 'email',
	objectName: 'Emails',

	/**
	 * Remove _syncModelsCanUpdateThis property or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	_syncModelsCanUpdateThis: true,

	/**
	 * indicate that the model was generated
	 */
	generated: true,

	/**
	 * if this model is visible
	 */
	visible: false,

	/*
	 Fields for this model.
	 */
	fields: {},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"emailFromTemplate": {
			"summary": "Send Emails",
			"description": "Sends an email to a list of email addresses you specify.   When sending an email, you specify the name of an email template created in Dashboard  (see [Managing Email Templates](http://docs.appcelerator.com/platform/latest/#!/guide/Managing_Email_Templates)), and one or more email recipients. You can optionally specify the email content type ( HTML, plain-text, or multipart), as well as values for any placeholder fields defined by the template. The below examples demonstrate these concepts.  An email template's body can contain HTML-formatted or plain-text content  , or both. When you send an email, you can specify whether the email should be sent  as HTML, plain text, or multipart using the `content_type` parameter.  A multipart email contains both the plain text and HTML versions; which  version is displayed is determined by the recipient's email client.  If the `content_type` parameter is **not** provided in the request, the format is automatically chosen based on the following rules:  * If the email template contains both HTML and plain-text bodies, it will be sent in a multipart format.  * If the email template contains only an HTML body, it will be sent in an HTML format.  * If the email template contains only a plain-text body. it will be sent in plain-text format.        If the `content_type` parameter is provided in the request, then the following must be true:  * If `content_type` is \"html\", then the email template must define an HTML body. * If `content_type` is \"plain\", then the email template must define a plain text body. * If `content_type` is \"multipart\", then the email template must define both HTML and plain text body. ",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "template",
					"description": "Name of the email template you have created.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "recipients",
					"description": "Comma separated list of email addresses.",
					"type": "String",
					"required": true
				},
				{
					"name": "content_type",
					"description": "Specifies the email's content-type. The following values are valid:\n\n* \"plain\" &mdash; If specified, the email template must define a plain text body.\n* \"html\" &mdash; If specified, the email template must define an HTML body.\n* \"multipart\" &mdash; If specified, the email template must define both a plain text\n   and HTML body.\n   \nSee [Managing Email Templates](http://docs.appcelerator.com/platform/latest/#!/guide/Managing_Email_Templates)\nfor details on creating email templates.\n",
					"type": "String"
				},
				{
					"name": "from",
					"description": "The sender's email address. \n\n**Notes**:\n  \n  * If you use Google as your SMTP server, the email will always be sent using the email account \n  you used to configure the SMTP service. \n  * Some SMTP service provider require the sender's email address to be present.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		}
	},

	_prepareParams: function prepareParams(method, instance, params, defaultValue) {
		params || (params = {});
		switch (method) {
			case 'update':
				defaultValue.email_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					email_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	},

	actions: []
};
