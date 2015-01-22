'use strict';

var APIBuilder = require("apibuilder");

/*
 The PushNotifications model.
 */
module.exports = APIBuilder.Model.extend("push_notification", {
	/**
	 * Remove generated: true or set it to false if you want to prevent syncModels.js from changing this file.
	 */
	generated: true,
	/*
	 Fields for this model.
	 */
	fields: {
	},
	/*
	 Methods for this model.
	 */
	methodMeta: {
		"channelsQuery": {
			"summary": "Channels Query",
			"description": "Returns a list of push notification channels the user is subscribed to.\n\nFor application admins, if the `user_id` parameter is not specified, returns all channels\nwith subscribed users.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "user_id",
					"description": "User to retrieve subscribed channels for.\n\nOnly application admins can query subscribed channels of a user.\n",
					"type": "String"
				},
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
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"channelsShow": {
			"summary": "Channels Show",
			"description": "Returns the number of devices subscribed to the specified channel.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": true,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "name",
					"description": "Name of the push channel.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String",
					"required": true
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"notify": {
			"summary": "notify",
			"description": "Sends push notifications to one or more users who are subscribed to a channel.\n\nSpecify either `friends` or `to_ids`. Enterprise users can also specify `where`.\nOne of these parameters must be used. These parameters cannot be used simultaneously.\n\nApplication admins can set the `to_ids` parameter to `everyone` to send to all devices\nsubscribed to the identified channel.\n\nThe REST version of `notify` includes the push notification ID in its response.\nSee the REST example below.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "channel",
					"description": "Name of the channel.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String",
					"required": true
				},
				{
					"name": "friends",
					"description": "If this parameter is specified (regardless of the parameter's value),\npush notifications are sent to any of the user's Friends who are\nsubscribed to the identified channel.\n",
					"type": "Any"
				},
				{
					"name": "to_ids",
					"description": "Comma-separated list of user IDs to send the notification to users who are subscribed\nto the specified channel. Up to 1000 users can be specified.\n\nYou **cannot** use this parameter when using a location query with the `where` parameter.\n\nApplication admins can set this parameter to `everyone` to send to all devices\nsubscribed to the channel.\n\nIf you are using the web interface, you do not need to specify this parameter.\n",
					"type": "String"
				},
				{
					"name": "payload",
					"description": "Payload to send with the push notification.\n\nFor a string, it will be sent as an alert (notification message).\n",
					"type": [
						"String",
						"PushPayload"
					],
					"required": true
				},
				{
					"name": "options",
					"description": "Additional push options.\n\n* *expire_after_seconds* (Number): Expiration time in seconds of when to stop sending the push notification.\n  For example, if the push notification expiration time is for a day and the user's device\n  is off for over a day, the user does not receive the push notification since it has expired.\n\nFor example, to specify a one day expiration period, use `options={'expire_after_seconds':86400}`.\n",
					"type": "Hash"
				},
				{
					"name": "where",
					"description": "A JSON-encoded object that defines either the user or location query used to select the device\nthat will receive the notification. Up to 1000 users can be returned by the query.\n\nIf you are using a location query, you **cannot** use the `to_ids` parameter.\n\n**Available only for Enterprise users.**\n\nTo specify a user query, set the `user` field to a custom query, for example, the\nfollowing query searches for all users with the first name of Joe:\n\n    where={\"user\": {\"first_name\":\"Joe\"}}\n\nTo specify a location query, set the `loc` field to a\n[MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/).\nThe following query searches for all users within 2 km of Oakland, CA, USA:\n\n    where={\"loc\": { \"$nearSphere\" : { \"$geometry\" : { \"type\" : \"Point\" , \"coordinates\" : [-122.2708,37.8044] } , \"$maxDistance\" : 2000 }}}\n\nFor details about using the `where` parameter, see the [Search and Query guide](#!/guide/search_query).\n",
					"type": "Hash"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"notifyTokens": {
			"summary": "notify_tokens",
			"description": "Sends push notifications to one or more users who are subscribed to a channel.\n\nApplication admins can set the `to_tokens` parameter to `everyone` to send to all devices\nsubscribed to the identified channel.\n\nIf you use the `to_tokens` parameter, you **cannot** specify a location query using the `where`\nparameter in the same API call.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "channel",
					"description": "Name of the channel.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String",
					"required": true
				},
				{
					"name": "to_tokens",
					"description": "Comma-separated list of device tokens. Sends push notification to the specified\ntokens who are subscribed to the specified channel.\n\nYou **cannot** use this parameter with a location query using the `where` parameter.\n\nApplication admins can set this parameter to `everyone` to send to all devices\nsubscribed to the channel.\n\nIf you are using the web interface, you do not need to specify this parameter.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "payload",
					"description": "Payload to send with the push notification.\n\nFor a string, it will be sent as an alert (message notification).\n",
					"type": [
						"String",
						"PushPayload"
					],
					"required": true
				},
				{
					"name": "options",
					"description": "Additional push options.\n\n* *expire_after_seconds* (Number): Expiration time in seconds of when to stop sending the push notification.\n  For example, if the push notification expiration time is for a day and the user's device\n  is off for over a day, the user does not receive the push notification since it has expired.\n\nFor example, to specify a one day expiration period, use `options={'expire_after_seconds':86400}`.\n",
					"type": "Hash"
				},
				{
					"name": "where",
					"description": "A JSON-encoded object that defines either the user or location query used to select the device\nthat will receive the notification. Up to 1000 users can be returned by the query.\n\nIf you are using the `to_tokens` parameter, you **cannot** specify a location query.\n\n**Available only for Enterprise users.**\n\nTo specify a user query, set the `user` field to a custom query, for example, the\nfollowing query searches for all users with the first name of Joe:\n\n    where={\"user\": {\"first_name\":\"Joe\"}}\n\nTo specify a location query, set the `loc` field to a\n[MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/).\nThe following query searches for all users within 2 km of Oakland, CA, USA:\n\n    where={\"loc\": { \"$nearSphere\" : { \"$geometry\" : { \"type\" : \"Point\" , \"coordinates\" : [-122.2708,37.8044] } , \"$maxDistance\" : 2000 }}}\n\nFor details about using the `where` parameter,\nsee the [Search and Query guide](#!/guide/search_query).\n",
					"type": "Hash"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"query": {
			"summary": "Query",
			"description": "Custom query of push notification subscriptions with pagination. For regular (non-admin) application\nusers, this method returns the currently logged-in user's list of push notification subscriptions.\nFor app admins, the method returns a list of subscriptions for all users, or just those\nfor the user specified by as the method's `su_id` parameter.\n\nYou can paginate query results using `skip` and `limit` parameters, or `page` and `per_page`, \nbut not both in the same query.        \n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"parameters": [
				{
					"name": "su_id",
					"description": "User ID of the user who has subscribed devices for push notification.\nYou must be an application admin to query another user's subscriptions.\n\nIf this parameter is not included, a list of subscriptions for all users is returned.\n",
					"type": "String"
				},
				{
					"name": "channel",
					"description": "Name of the push notification channel.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String"
				},
				{
					"name": "device_token",
					"description": "Apple or Android Device Token.",
					"type": "String"
				},
				{
					"name": "type",
					"description": "Selects the push type.\n\nSet to `android` for Android devices using either Google Cloud Messaging\nor the MQTT protocol, or `ios` for iOS devices using Apple Push Notification Service.\n\nUsing `gcm` to specify Google Cloud Messaging still works.\n",
					"type": "String"
				},
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
					"name": "limit",
					"description": "Instead of using `page` and `per_page` for pagination, you can use `limit` and\n`skip` to do your own pagination. `limit` is the maximum number of records to `skip`. \nThe specified value must be greater than 0 and no greater than 1000, or an HTTP 400 \n(Bad Request) error will be returned.\n",
					"type": "Number"
				},
				{
					"name": "skip",
					"description": "Number of records to skip. Must be used together with `limit`. The specified value must not\nbe less than 0 or an HTTP 400 error will be returned.\n",
					"type": "Number"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"resetBadgeGet": {
			"summary": "reset_badge",
			"description": "Sets the internally stored value of the badge to zero for all devices.\n\n**Only available to application admins.**\n\nThis method only updates the internally stored value of the badge.  To update the badge value\non the iOS icon or Android notification center, send a push notification with the `badge` field defined.\n\nTo send this command to a specific device, use the [PUT version](#!/api/PushNotifications-method-reset_badge_put)\nof this method.\n",
			"authRequired": false,
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
		"resetBadgePut": {
			"summary": "reset_badge",
			"description": "Sets the internally stored value of the badge to zero of a specific device.\n\nThis method only updates the internally stored value of the badge.  To update the badge value\non the iOS icon or Android notification center, send a push notification with the `badge` field defined.\n\nIf you are an application admin, you can also use the\n[GET version](#!/api/PushNotifications-method-reset_badge_get) of this method.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "device_token",
					"description": "Device token.\n",
					"type": "String",
					"required": true
				}
			]
		},
		"setBadge": {
			"summary": "set_badge",
			"description": "Sets the value of the internally stored value of the badge.\n\nThis method only updates the internally stored value of the badge.  To update the badge value\non the iOS icon or Android notification center, send a push notification with the `badge` field defined.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "device_token",
					"description": "Device token. Required if you are not an application admin.\n",
					"type": "String"
				},
				{
					"name": "badge_number",
					"description": "Number to set as the badge on the application's icon.\nSpecify postive and negative values with the `+` and `-`\nsymbols to increment or decrement the current badge number, respectively.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"subscribe": {
			"summary": "subscribe",
			"description": "Subscribes a mobile device to a push notifications channel. Developers can\ncreate different channels for different types of push notifications. For\ninstance, a channel for friend request, a channel for chat, etc. Push\nnotifications currently only work on iOS and Andriod.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "channel",
					"description": "Push notification channel to subscribe to.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String",
					"required": true
				},
				{
					"name": "device_token",
					"description": "Apple or Android Device Token.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User ID to subscribe on behalf of.\n\nOnly application admins can subscribe to push notifications on behalf of other\nusers.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"subscribeToken": {
			"summary": "",
			"description": "Subscribes a mobile device to a push notifications channel.\n\nDevelopers can create different channels for different types of push notifications, such as\na friend request, chat, etc.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "device_token",
					"description": "Android or iOS device token.\n\nFor Android GCM, the length is dynamic and is less than 4096 characters.\n\nFor Android MQTT, the length is fixed and 23 characters.\n\nFor iOS, the length is 64 characters.\n",
					"type": "String",
					"required": true
				},
				{
					"name": "channel",
					"description": "Name of the channel.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String",
					"required": true
				},
				{
					"name": "type",
					"description": "Selects the push type.\n\nSet to `android` for Android devices using either Google Cloud Messaging\nor the MQTT protocol, or `ios` for iOS devices using Apple Push Notification Service.\n\nUsing `gcm` to specify Google Cloud Messaging still works.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"subscriptionUpdate": {
			"summary": "Update the Subscription",
			"description": "Updates the device's push channel subscription.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "device_token",
					"description": "Apple or Android Device Token.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User ID to update the subscription on behalf of. You must be logged in as an application administrator\nto update another user's notification subscription.\n",
					"type": "String"
				},
				{
					"name": "loc",
					"description": "The device's current location specified as an array with longitude as the first element, and latitude\nas the second element (`[longitude,latitude]`).\n",
					"type": "Array"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"unsubscribe": {
			"summary": "unsubscribe",
			"description": "Unsubscribes one of the current user's devices from a push notification channel. If channel name is not\nprovided, unsubscribe the device from all channels.\n\nWhen a user logs out from a device, you can cancel all subscriptions for the\ndevice by passing the device's token to the Users#logout method.\n",
			"authRequired": true,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "channel",
					"description": "Name of the push notification channel.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String"
				},
				{
					"name": "device_token",
					"description": "Apple or Android Device Token.",
					"type": "String",
					"required": true
				},
				{
					"name": "user_id",
					"description": "User ID to unsubscribe from push notifications.\n\nOnly application admins can unsubscribe another user from push notifications.\n",
					"type": "String"
				},
				{
					"name": "pretty_json",
					"description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
					"type": "Boolean"
				}
			]
		},
		"unsubscribeToken": {
			"summary": "unsubscribe_token",
			"description": "Unsubscribes the specified device from a push notification channel.\nIf `channel` is not defined, unsubscribes the device from all channels.\n",
			"authRequired": false,
			"instance": true,
			"adminRequired": false,
			"response": {
				"singleElement": true
			},
			"parameters": [
				{
					"name": "channel",
					"description": "Name of the push notification channel.\n\nThe name of the push channel cannot start with a hash symbol ('#').\n",
					"type": "String"
				},
				{
					"name": "device_token",
					"description": "Android or iOS device token.",
					"type": "String",
					"required": true
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
				defaultValue.push_notification_id = instance.getPrimaryKey();
				return defaultValue;
			case 'delete':
				return {
					push_notification_id: instance.getPrimaryKey()
				};
		}
		return defaultValue;
	}
});
