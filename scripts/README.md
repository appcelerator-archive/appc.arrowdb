# Model Generation
This script will sync the schema with the latest documentation from ACS.

It requires a GitHub access token, which you can generate at https://github.com/settings/applications

Run this as follows:

> GITHUB_TOKEN=d04187jertewfb0dadfg3234f4sdfghjhgsebc node syncModels.js

## Speeding Up Development

If you are doing development and want to cache the HTTP responses from the server, and thus speed up the generation
process, simply add "CACHE=true " to your command, such as:

> CACHE=true GITHUB_TOKEN=d04187jertewfb0dadfg3234f4sdfghjhgsebc node syncModels.js

## Debugging Development

To receive additional information, such as the parsed YAML document object, or the resulting object with all of its
fields and methods, simply add "LOG_KEY=Posts " or similar to your command, such as:

> LOG_KEY=Posts CACHE=true GITHUB_TOKEN=d04187jertewfb0dadfg3234f4sdfghjhgsebc node syncModels.js
