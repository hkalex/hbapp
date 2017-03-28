//import analytics from './analytics.js';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

export default function sendAnalytics(data) {
  const appId = Meteor.settings.private.SMS_APP_ID;
  const appKey = Meteor.settings.private.SMS_APP_KEY;

  const options = {
    appId: appId,
    appKey: appKey,
    data: data.data,
    headers: {}
  }

  const url = data.url;
  const method = data.method || 'get';

  if (method === 'post' || method === 'put') {
    options.headers['Content-Type'] = 'application/json';
  }
  if (options.appId) {
    options.headers['X-AVOSCloud-Application-Id'] = options.appId;
  }
  if (options.appKey) {
    options.headers['X-AVOSCloud-Application-Key'] = options.appKey;
  }

  return new Promise((resolve, reject) => {
    HTTP.call(method, url, options, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}