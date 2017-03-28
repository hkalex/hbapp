import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// import {Users} from '../db/collection';
import logger from '../loggers/logger';

export function getUserIdForLogin(payload) {

  // This is console side only
  // CAUTION: client side don't use payload.login as phoneNum
  // if(!(payload.login === '18600000000')){
  //   throw new Meteor.Error("Permission denied", "Only admin can log in");
  // }

  const user = Meteor.users.findOne({
    username: payload.login
  }) || Meteor.users.findOne({
    phoneNum: payload.login
  });


  if (user) {
    return user._id;
  } else {
    throw new Meteor.Error("User not Found", "Can't find user with such username/phoneNum");
  }
}

// payload here is either a phoneNum or username
export function passwordResetGetCode(payload) {

  const user = Meteor.users.findOne({
    username: payload
  }) || Meteor.users.findOne({
    phoneNum: payload
  });

  if (user) {
    Meteor.call('SMS.sendCode', payload, null, function (error, result) {
      error && logger.log(error);
      result && logger.log(result);
    });
  } else {
    throw new Meteor.Error("User not Found", "Can't find user with such username/phoneNum");
  }

}

export function passwordReset(payload) {
  const user = Meteor.users.findOne({
    username: payload.login
  }) || Meteor.users.findOne({
    phoneNum: payload.login
  });


  if (user) {
    Accounts.setPassword(user._id, payload.password);
  }

}