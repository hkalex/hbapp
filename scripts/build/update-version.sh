#!/usr/local/bin/node
/*
# usage: ./update-version.sh <newVersoin>
*/

// import modules
var fs = require('fs');

// read arguments
var newVersion = process.argv[2];

if (!newVersion) {
  console.log(`
Usage
---
  chmod a+x update-version.sh
  ./update-version.sh <newVersion>
`);
  return 1;
}

// define const
const TAB = "  ";

function jsonReplace(fileName, setter) {
  var content = fs.readFileSync(fileName, { encoding: 'utf8' });
  var json = JSON.parse(content);
  setter(json);
  fs.writeFile(fileName, JSON.stringify(json, null, TAB));
}

function textReplace(fileName, regex, newValue) {
  var content = fs.readFileSync(fileName, {encoding: 'utf8'});
  content = content.replace(regex, function(match, id) {
    return newValue;
  });
  fs.writeFile(fileName, content);
}


// update package.json
jsonReplace('../../hbconsole/package.json', function(json) { json.version = newVersion; });
jsonReplace('../../hbapp/package.json', function(json) { json.version = newVersion; });

// update settings.common.json
textReplace('../../hbapp/imports/settings/settings.common.js', /"*APP_VERSION"*: ["'\d\.a-zA-Z]+/g, 'APP_VERSION: "'+ newVersion +'"');

// update mobile-config.json
textReplace('../../hbapp/mobile-config.js', /version: ["'\d\.abcABC]+/g, "version: '" + newVersion + "'");

// update Constants.js
textReplace('../../hbapp/imports/consts/Constants.js', /APP_VERSION = ["'\d\.a-zA-Z]+/g, "APP_VERSION = '" + newVersion + "'");

