function mergeSettings() {
  var publicSettings = {};
  var privateSettings = {};

  // merge
  for(var i=0, l=arguments.length; i<l; i++) {
    var settings = arguments[i];
    if (settings) {
      if (settings.public) {
        publicSettings = Object.assign(publicSettings, settings.public);
      }
      if (settings.private) {
        privateSettings = Object.assign(privateSettings, settings.private);
      }
    }
  }

  return {
    public: publicSettings,
    private: privateSettings
  }

}

module.exports = mergeSettings;
