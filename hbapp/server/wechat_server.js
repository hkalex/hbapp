import { Accounts } from 'meteor/accounts-base';
// import { OAuth } from 'meteor/oauth';

Accounts.registerLoginHandler(function (loginRequest) {

  if (!loginRequest.cordova) {
    return undefined;
  }

  if (loginRequest.accessToken && loginRequest.userInfo) {
    var serviceData = {
      id: loginRequest.accessToken.unionid,
      accessToken: loginRequest.accessToken.access_token,
      expiresAt: (+new Date) + (1000 * loginRequest.accessToken.expires_in),
      sex: loginRequest.userInfo.sex,
      language: loginRequest.userInfo.language,
      city: loginRequest.userInfo.city,
      province: loginRequest.userInfo.province,
      country: loginRequest.userInfo.country
    };

    var options = { profile: {} };
    options.username = loginRequest.userInfo.nickname;
    options.profile.avatar = loginRequest.userInfo.headimgurl;
  }

  return Accounts.updateOrCreateUserFromExternalService("wechat", serviceData, options);
});

