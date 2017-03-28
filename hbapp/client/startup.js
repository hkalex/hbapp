import { Meteor } from 'meteor/meteor';
import C from '/imports/consts/Constants';
import { TAPi18n } from 'meteor/tap:i18n';

C.APP_CODE = 'M';

let isInWeChat = null;

Meteor.isInWeChat = function () {
  if (isInWeChat === null) {
    isInWeChat = /MicroMessenger/i.test(navigator.userAgent);
  }
  return isInWeChat;
}

Meteor.startup(() => {
  TAPi18n.setLanguage('zh');
});

