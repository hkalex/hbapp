import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

// acitons
// import { simpleDialogAction } from '/imports/actions/utils/dialogAction';

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
              //  phoneNum is undefined
              // if(Meteor.userId() && !Meteor.userId().phoneNum){
              //   browserHistory.push('/bind_phone');
              // } else {
              // browserHistory.push('/main');
              // }
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
      // if (localStorage.accessToken) {
      //   alert(localStorage.accessToken);
      //   Meteor.call('Wechat.checkAccessToken',
      //     JSON.parse(localStorage.accessToken).access_token,
      //     JSON.parse(localStorage.accessToken).openId,
      //     function (error, result) {
      //       alert(JSON.stringify(error));
      //       alert("checkAccessToken");
      //       if (result.statusCode == 200 && JSON.parse(result.content).errmsg == 'ok') {
      //         alert("meiernflsdf");
      //         getUserInfo(localStorage.accessToken);
      //       } else {
      //         Meteor.call('Wechat.refreshAccessToken', 
      //         JSON.parse(localStorage.accessToken).refresh_token,
      //         function (error, result) {
      //           alert("refreshAccessToken");
      //           if (!error) {
      //             localStorage.accessToken = result.content;
      //             getUserInfo(result);
      //           } else {
      //             alert(JSON.stringify(error));
      //           }
      //         });
      //       }
      //     });
      // } else {
      Wechat.isInstalled(function (installed) {
        if (installed) {
          var scope = "snsapi_userinfo", state = "_" + (+new Date());
          Wechat.auth(scope, state, function (response) {
            // alert(response);
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

      // }
    });
  }
}