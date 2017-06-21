'use strict';

var Arrow = require('arrow');

/*
 The PushNotifications model.
 */
module.exports = {
    name: 'pushNotification',
    objectName: 'PushNotifications',

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
    visible: true,

	/*
	 Fields for this model.
	 */
    fields: {
        "payload": {
            // "originalType": "String",
            "type": String,
            "description": "The notification payload."
        },
        "channel": {
            // "originalType": "Array",
            "type": Array,
            "description": "The notification channel/channels."
        },
        "device_token": {
            // "originalType": "String",
            "type": String,
            "description": "iOS or Android device token associated with this subscription."
        },
        "type": {
            // "originalType": "String",
            "type": String,
            "description": "iOS or Android device type."
        }
    },
	/*
	 Methods for this model.
	 */
    methodMeta: {
        "notify": {
            "summary": "Send PushNotification",
            "description": "Sends push notifications to one or more users who are subscribed to a channel. Specify either friends, to_ids or where. One of these parameters must be used. These parameters cannot be used simultaneously. Application admins can set the to_ids parameter to everyone to send to all devices subscribed to the identified channel. The REST version of notify includes the push notification ID in its response. See the REST example below. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "name": "push_notification",
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "channel",
                    "description": "Name of the channel. For multiple channels, either comma-separate the list of channels or use an array of strings.\n\nThe name of the push channel cannot start with a hash symbol ('#') or contain a comma (',').\n",
                    "type": [
                        "String",
                        "Array"
                    ],
                    "required": true
                },
                {
                    "name": "friends",
                    "description": "If this parameter is specified (regardless of the parameter's value), push notifications are sent to any of the user's Friends who are subscribed to the identified channel.\n"
                },
                {
                    "name": "to_ids",
                    "description": "Comma-separated list of user IDs to send the notification to users who are subscribed to the specified channel. Up to 1000 users can be specified.\n\nYou cannot use this parameter when using a location query with the where parameter.\n\nApplication admins can set this parameter to everyone to send to all devices subscribed to the channel.\n\nIf you are using the web interface, you do not need to specify this parameter.\n",
                    "type": "String"
                },
                {
                    "name": "payload",
                    "description": "Payload to send with the push notification.\n\nFor a string, it will be sent as an alert (notification message).\n",
                    "type": [
                        "String",
                        "Object"
                    ],
                    "required": true
                },
                {
                    "name": "options",
                    "description": "Additional push options.\n\n * expire_after_seconds (Number): Expiration time in seconds of when to stop sending the push notification. For example, if the push notification expiration time is for a day and the user's device is off for over a day, the user does not receive the push notification since it has expired.\n\nFor example, to specify a one day expiration period, use options={'expire_after_seconds':86400}.\n",
                    "type": "Hash"
                },
                {
                    "name": "where",
                    "description": "A JSON-encoded object that defines either the user or location query used to select the device that will receive the notification. Up to 1000 users can be returned by the query.\n\nIf you are using a location query, you **cannot** use the `to_ids` parameter.\n\nTo specify a user query, set the `user` field to a custom query, for example, the following query searches for all users with the first name of Joe:\n\nwhere={\"user\": {\"first_name\":\"Joe\"}\n\nTo specify a location query, set the `loc` field to a [MongoDB Geospatial Query](http://docs.mongodb.org/manual/reference/operator/query-geospatial/). The following query searches for all users within 2 km of Oakland, CA, USA:\n\nwhere={\"loc\": { \"$nearSphere\" : { \"$geometry\" : { \"type\" : \"Point\" , \"coordinates\" : [-122.2708,37.8044] } , \"$maxDistance\" : 2000 }}}\n\nFor details about using the `where` parameter, see the [Search and Query guide](#!/guide/search_query).\n",
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
            "summary": "Send PushNotification to channel's users",
            "description": "Sends push notifications to one or more users who are subscribed to a channel. Application admins can set the to_tokens parameter to everyone to send to all devices subscribed to the identified channel. If you use the to_tokens parameter, you cannot specify a location query using the where parameter in the same API call. ",
            "authRequired": false,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "channel",
                    "description": "Name of the channel. For multiple channels, either comma-separate the list of channels or use an array of strings.\n\nThe name of the push channel cannot start with a hash symbol ('#') or contain a comma (',').\n",
                    "type": [
                        "String",
                        "Array"
                    ],
                    "required": true
                },
                {
                    "name": "to_tokens",
                    "description": "Comma-separated list of device tokens. Sends push notification to the specified tokens who are subscribed to the specified channel.\nYou cannot use this parameter with a location query using the where parameter.\nApplication admins can set this parameter to everyone to send to all devices subscribed to the channel.\nIf you are using the web interface, you do not need to specify this parameter.\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "payload",
                    "description": "Payload to send with the push notification.\n\nFor a string, it will be sent as an alert (notification message).\n",
                    "type": [
                        "String",
                        "Object"
                    ],
                    "required": true
                },
                {
                    "name": "options",
                    "description": "Additional push options.\n\n * expire_after_seconds (Number): Expiration time in seconds of when to stop sending the push notification. For example, if the push notification expiration time is for a day and the user's device is off for over a day, the user does not receive the push notification since it has expired.\n\nFor example, to specify a one day expiration period, use options={'expire_after_seconds':86400}.\n",
                    "type": "Hash"
                },
                {
                    "name": "where",
                    "description": "A JSON-encoded object that defines either the user or location query used to select the device that will receive the notification. Up to 1000 users can be returned by the query.\n\nIf you are using the to_tokens parameter, you cannot specify a location query.\n\nTo specify a user query, set the user field to a custom query, for example, the following query searches for all users with the first name of Joe:\n\nwhere={\"user\": {\"first_name\":\"Joe\"}\n\nTo specify a location query, set the loc field to a MongoDB Geospatial Query. The following query searches for all users within 2 km of Oakland, CA, USA:\n\nwhere={\"loc\": { \"$nearSphere\" : { \"$geometry\" : { \"type\" : \"Point\" , \"coordinates\" : [-122.2708,37.8044] } , \"$maxDistance\" : 2000 }}}\n\nFor details about using the `where` parameter, see the [Search and Query guide](#!/guide/search_query).\n",
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
            "summary": "Performs a custom query of PoshNotification subscription",
            "description": "Note: this API is only available for applications created with ArrowDB 1.1.7 or greater. Custom query of push notification subscriptions with pagination. For regular (non-admin) application users, this method returns the currently logged-in user's list of push notification subscriptions. For app admins, the method returns a list of subscriptions for all users, or just those for the user specified by as the method's su_id parameter. You can paginate query results using skip and limit parameters, or page and per_page, but not both in the same query. ",
            "authRequired": false,
            "instance": true,
            "adminRequired": false,
            "response": {
                "name": "subscriptions"
            },
            "parameters": [
                {
                    "name": "su_id",
                    "description": "User ID of the user who has subscribed devices for push notification. You must be an application admin to query another user's subscriptions.\n\nIf this parameter is not included, a list of subscriptions for all users is returned.\n",
                    "type": "String"
                },
                {
                    "name": "channel",
                    "description": "Name of the push notification channel.\n\nThe name of the push channel cannot start with a hash symbol ('#') or contain a comma (',').\n",
                    "type": "String"
                },
                {
                    "name": "device_token",
                    "description": "Apple or Android Device Token.\n",
                    "type": "String"
                },
                {
                    "name": "type",
                    "description": "Selects the push type.\n\nSet to android for Android devices usingGoogle Cloud Messaging or ios for iOS devices using Apple Push Notification Service.\n",
                    "type": "String"
                },
                {
                    "name": "page",
                    "description": "Request page number, default is 1.\n",
                    "type": "Number"
                },
                {
                    "name": "per_page",
                    "description": "Number of results per page, default is 10.\n",
                    "type": "Number"
                },
                {
                    "name": "limit",
                    "description": "Instead of using page and per_page for pagination, you can use limit and skip to do your own pagination. limit is the maximum number of records to skip. The specified value must be greater than 0 and no greater than 1000, or an HTTP 400 (Bad Request) error will be returned.\n",
                    "type": "Number"
                },
                {
                    "name": "skip",
                    "description": "Number of records to skip. Must be used together with limit. The specified value must not be less than 0 or an HTTP 400 error will be returned.\n",
                    "type": "Number"
                },
                {
                    "name": "pretty_json",
                    "description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
                    "type": "Boolean"
                }
            ]
        },
        "resetBadge": {
            "summary": "Send PushNotification to reset badge",
            "description": "Sets the internally stored value of the badge to zero of a specific device. This method only updates the internally stored value of the badge. To update the badge value on the iOS icon or Android notification center, send a push notification with the badge field defined. If you are an application admin, you may omit the device token. ",
            "authRequired": false,
            "instance": true,
            "adminRequired": false,
            "parameters": [
                {
                    "name": "device_token",
                    "description": "Device token. If you are an application admin, you may omit the device token.\n",
                    "type": "String",
                    "required": true
                }
            ]
        },
        "setBadge": {
            "summary": "",
            "description": "Sets the value of the internally stored value of the badge. This method only updates the internally stored value of the badge. To update the badge value on the iOS icon or Android notification center, send a push notification with the badge field defined. ",
            "authRequired": false,
            "instance": true,
            "adminRequired": false,
            "parameters": [
                {
                    "name": "device_token",
                    "description": "Device token. Required if you are not an application admin.\n",
                    "type": "String"
                },
                {
                    "name": "badge_number",
                    "description": "Number to set as the badge on the application's icon. Specify postive and negative values with the + and - symbols to increment or decrement the current badge number, respectively.\n",
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
            "summary": "Subscribe to a channel",
            "description": "Subscribes a mobile device to a push notifications channel. Developers can create different channels for different types of push notifications. For instance, a channel for friend request, a channel for chat, etc. Push notifications currently only work on iOS and Andriod. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "channel",
                    "description": "Push notification channel to subscribe to. For multiple channels, comma separate the list of channel names.\n\nThe name of the push channel cannot start with a hash symbol ('#') or contain a comma (',').\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "device_token",
                    "description": "Apple or Android Device Token.\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "type",
                    "description": "Selects the push type.\n\nSet to android for Android devices using Google Cloud Messaging or ios for iOS devices using Apple Push Notification Service.\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "su_id",
                    "description": "User ID to subscribe on behalf of.\n\nOnly application admins can subscribe to push notifications on behalf of other users.\n",
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
            "summary": "Subscribes a mobile device to a channel",
            "description": "Subscribes a mobile device to a push notifications channel.\n\nDevelopers can create different channels for different types of push notifications, such as a friend request, chat, etc. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "device_token",
                    "description": "Android or iOS device token.\n\nFor Android, the length is dynamic and is less than 4096 characters.\n\nFor iOS, the length is 64 characters.\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "channel",
                    "description": "Name of the channel. For multiple channels, comma separate the list of channel names.\n\nThe name of the push channel cannot start with a hash symbol ('#') or contain a comma (',').\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "type",
                    "description": "Selects the push type.\n\nSet to android for Android devices using Google Cloud Messaging or ios for iOS devices using Apple Push Notification Service.\n",
                    "type": "String"
                },
                {
                    "name": "pretty_json",
                    "description": "Determines if the JSON response is formatted for readability (`true`), or displayed on a\nsingle line (`false`). Default is `false`.\n",
                    "type": "Boolean"
                }
            ]
        },
        "updateSubscription": {
            "summary": "Update subscription to a channel",
            "description": "Updates the device's push channel subscription. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "device_token",
                    "description": "Apple or Android Device Token.\n",
                    "type": "String",
                    "required": true
                },
                {
                    "name": "su_id",
                    "description": "User ID to update the subscription on behalf of. You must be logged in as an application administrator to update another user's notification subscription.\n",
                    "type": "String"
                },
                {
                    "name": "loc",
                    "description": "The device's current location specified as an array with longitude as the first element, and latitude as the second element ([longitude,latitude]).\n",
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
            "summary": "Unsubscribe from a channel",
            "description": "Unsubscribes one of the current user's devices from a push notification channel. If channel name is not provided, unsubscribe the device from all channels. When a user logs out from a device, you can cancel all subscriptions for the device by passing the device's token to the [Users.logout](http://docs.appcelerator.com/arrowdb/latest/#!/api/Users-method-logout) method. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "channel",
                    "description": "Name of the push notification channel. For multiple channels, comma separate the list of channel names.\n\nThe name of the push channel cannot start with a hash symbol ('#') or contains a comma (',').\n",
                    "type": "String"
                },
                {
                    "name": "device_token",
                    "description": "Apple or Android Device Token.\n",
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
            "summary": "Unsubscribe mobile device from a channel",
            "description": "Unsubscribes the specified device from a push notification channel. If channel is not defined, unsubscribes the device from all channels. ",
            "authRequired": true,
            "instance": true,
            "adminRequired": false,
            "response": {
                "singleElement": true
            },
            "parameters": [
                {
                    "name": "channel",
                    "description": "Name of the push notification channel. For multiple channels, comma separate the list of channel names.\n\nThe name of the push channel cannot start with a hash symbol ('#') or contains a comma (',').\n",
                    "type": "String"
                },
                {
                    "name": "device_token",
                    "description": "Apple or Android Device Token.\n",
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

    instance: function instance(values, skipNotFound, params) {
        if (typeof values.channel === 'string') {
            values.channel = [values.channel];
        }
        return new Arrow.Instance(this, values, skipNotFound);
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
    },

    actions: []
};