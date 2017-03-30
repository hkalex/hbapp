import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

function getUserInfo(result) {
  const loginRequest = {};
  loginRequest.cordova = true;
  loginRequest.accessToken = JSON.parse(result.content);
  Meteor.call('Wechat.getUserInfo',
    JSON.parse(result.content).access_token,
    JSON.parse(result.content).openid,
    function (error, result) {
      if (!error) {
        loginRequest.userInfo = JSON.parse(result.content);

        Accounts.callLoginMethod({
          methodArguments: [loginRequest],
          userCallback: function (error) {
            if (!error) {
              Meteor.call("queryPhoneNumber", function(error, result){
                if(result){
                  browserHistory.push('/main');
                } else {
                  browserHistory.push('/bind_phone');
                }
              })

              browserHistory.push('/home');

            } else {
              alert(JSON.stringify(error));
            }
          }
        });
      } else {
        alert(JSON.stringify(error));
      }
    });
}

function getAccessToken(response) {
  Meteor.call('Wechat.getAccessToken', response.code, function (error, result) {
    if (!error) {
      // localStorage.accessToken = result.content;
      getUserInfo(result);

    } else {
      alert(JSON.stringify(error));
    }
  });
}

export default function loginWithWechat(dispatch) {
  if (Meteor.isCordova) {
    Meteor.startup(() => {
      Wechat.isInstalled(function (installed) {
        if (installed) {
          var scope = "snsapi_userinfo", state = "_" + (+new Date());
          Wechat.auth(scope, state, function (response) {
            getAccessToken(response);
          }, function (reason) {
            alert("Failed: " + reason);
          });
        } else {
          alert("请您先安装微信");
        }
      }, function (reason) {
        alert("Failed: " + reason);
      });
    });
  }
}