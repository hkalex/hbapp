var commonSettings = require('./settings.common');
var mergeSettings = require('./mergeSettings');

var settings = {
  public: {
    APP_CODE: "M",
  },
  private: {

  }
}

var result = mergeSettings(commonSettings, settings);

/* eslint-disable all */
console.log(JSON.stringify(result, null, '  '));  // null, '  ' means format the JSON
/* eslint-disable all */
