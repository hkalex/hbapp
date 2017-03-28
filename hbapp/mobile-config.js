// This section sets up some basic app metadata,
// the entire section is optional.
/* eslint-disable no-undef */
App.info({
  id: 'com.SENSITY.client',
  // name: 'SENSITY', // This is NOT set here!!
  description: 'SENSITY',
  author: 'SENSITY Team',
  email: 'alex.yeung@SENSITY.com',
  website: 'http://SENSITY',
  version: '0.1.17047'
});
// Set up resources such as icons and launch screens.
App.icons({
  'iphone_2x': 'public/mobile/logo_120.png',
  'iphone_3x': 'public/mobile/logo_180.png',
  'ipad': 'public/mobile/logo_76.png',
  'ipad_2x': 'public/mobile/logo_152.png',
  'ipad_pro': 'public/mobile/logo_167.png',
  'ios_settings': 'public/mobile/logo_29.png',
  'ios_settings_2x': 'public/mobile/logo_58.png',
  'ios_settings_3x': 'public/mobile/logo_87.png',
  'ios_spotlight': 'public/mobile/logo_40.png',
  'ios_spotlight_2x': 'public/mobile/logo_80.png',
  'android_mdpi': 'public/mobile/logo_48.png',
  'android_hdpi': 'public/mobile/logo_72.png',
  'android_xhdpi': 'public/mobile/logo_96.png',
  'android_xxhdpi': 'public/mobile/logo_144.png',
  'android_xxxhdpi': 'public/mobile/logo_192.png'
  // ... more screen sizes and platforms ...
});
App.launchScreens({
  'iphone_2x': 'public/mobile/splash_640_960.png',
  'iphone5': 'public/mobile/splash_640_1136.png',
  'iphone6': 'public/mobile/splash_750_1334.png',
  'iphone6p_portrait': 'public/mobile/splash_1242_2208.png',
  'iphone6p_landscape': 'public/mobile/splash_2208_1242.png',
  'ipad_portrait': 'public/mobile/splash_768_1024.png',
  'ipad_portrait_2x': 'public/mobile/splash_1536_2048.png',
  'ipad_landscape': 'public/mobile/splash_1024_768.png',
  'ipad_landscape_2x': 'public/mobile/splash_2048_1536.png'
  // ... more screen sizes and platforms ...
});
// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('cordova-plugin-wechat', {
  WECHATAPPID: 'wx4d6831d0b79aceab'
});
App.configurePlugin('cordova-plugin-calendar', {
  CALENDAR_USAGE_DESCRIPTION: '领跑财富'
});
App.configurePlugin('cordova-plugin-geolocation', {
  GEOLOCATION_USAGE_DESCRIPTION: '领跑财富'
});
// Add custom tags for a particular PhoneGap/Cordova plugin
// to the end of generated config.xml.
// Universal Links is shown as an example here.
App.appendToConfig(`
  <universal-links>
    <host name="localhost:3000" />
  </universal-links>
  <access origin="*" />
  <preference name="AppendUserAgent" value="HBAPP/1.0" />
`);


// Allow any domains!!
App.accessRule("*");
App.accessRule('*', { type: 'navigation' });
App.accessRule('*', { type: 'intent' });
