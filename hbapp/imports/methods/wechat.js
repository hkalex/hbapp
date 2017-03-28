import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

function getAccessToken(code) {
  check(code, String);
  return new Promise((resolve, reject) => {
    let appid = Meteor.settings.private.WECHAT_ID;
    let secret = Meteor.settings.private.WECHAT_SECRET;

    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
    HTTP.call('GET', url, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function getUserInfo(access_token, openid) {
  check(access_token, String);
  check(openid, String);
  return new Promise((resolve, reject) => {
    let url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`;
    HTTP.call('GET', url, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// function checkAccessToken(access_token, openid) {
//   check(access_token, String);
//   check(openid, String);
//   return new Promise((resolve, reject) => {
//     let url = `https://api.weixin.qq.com/sns/auth?access_token=${access_token}&openid=${openid}`;
//     HTTP.call('GET', url, function (error, result) {
//       if (error) {
//         console.log(error);
//         reject(error);
//       } else {
//         console.log(result);
//         resolve(result);
//       }
//     });
//   });
// }

// function refreshAccessToken(refresh_token) {
//   check(refresh_token, String);
//   let appid = Meteor.settings.private.WECHAT_ID;
//   return new Promise((resolve, reject) => {
//     let url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`;
//     HTTP.call('GET', url, function (error, result) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }

const Wechat = {
  getAccessToken,
  getUserInfo
  // checkAccessToken,
  // refreshAccessToken
}

export default Wechat;