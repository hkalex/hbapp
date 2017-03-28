import AV from 'leancloud-storage';
import logger from '/imports/loggers/logger';
import {Meteor} from 'meteor/meteor';

class SMS {
  constructor(appId, appKey) {
    this.appId = appId;
    this.appKey = appKey;

    // initialize appId and appKey
    AV.init({
      appId: appId,
      appKey: appKey
    });
  }

  /**
   * 
   * 
   * @param {any} phoneNumber : send code to this phone number
   * @param {any} op : action name
   * @param {any} ttl : expiration time(units is minutes), default value is 10 minutes
   * @returns : Promise function
   * 
   * @memberOf SMS
   */
  sendCode(phoneNumber, op = null, ttl = 0) {
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phoneNumber.trim()))){
      throw new Error('Invalid mobile phone number');
    }
    logger.log("send code to - " + phoneNumber);
    console.log(Meteor.settings.private.SMS_DUMMY);
    console.log(Meteor.settings.private.SMS_DUMMY);
    if (!Meteor.settings.private.SMS_DUMMY && !process.env.SMS_DUMMY) {
      op = op || Meteor.settings.private.SMS_MSG_ACTION;
      ttl = ttl || Meteor.settings.private.SMS_TIMEOUT;

      return new Promise((resolve, reject) => {
        AV.Cloud.requestSmsCode({
          mobilePhoneNumber: phoneNumber,
          name: Meteor.settings.private.SMS_MSG_APPNAME,
          op: op,
          ttl: ttl
        }).then(function () {
          // send success
          resolve('send code success');
        }, function () {
          // send failed
          reject('send code failed');
        });
      });
    } else {
      return new Promise((resolve) => {
        resolve('send code success');
      });
    }
  }

  /**
   * 
   * 
   * @param {any} code : verification code
   * @param {any} phoneNumber : verify this phone number
   * @returns : Promise function
   * 
   * @memberOf SMS
   */
  verifyCode(code, phoneNumber) {
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phoneNumber.trim()))){
      throw new Error('Invalid mobile phone number');
    }
    if(!(/^\d{6}$/.test(code.trim()))){
      throw new Error('Invalid verification code');
    }
    logger.log("verify phoneNumber is - " + phoneNumber);
    logger.log("verify code is - " + code);
    if (!Meteor.settings.private.SMS_DUMMY && !process.env.SMS_DUMMY) {
      return new Promise((resolve, reject) => {
        AV.Cloud.verifySmsCode(code, phoneNumber).then(function () {
          // validation success
          resolve('validation success');
        }, function (err) {
          // validation failed
          reject(new Meteor.Error(403, "验证码错误")); 
        });
      });
    }else{
      return new Promise((resolve) => {
        resolve('validation success');
      });
    }
  }
}

const appId = Meteor.settings.private.SMS_APP_ID;
const appKey = Meteor.settings.private.SMS_APP_KEY;

const sms = new SMS(appId, appKey);

export default sms;