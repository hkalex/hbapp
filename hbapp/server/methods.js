import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Todos } from '../imports/db/collection';
import { getUserIdForLogin, passwordResetGetCode, passwordReset } from '../imports/methods/user';
import { setProjectFavorite } from '/imports/methods/project';
import sms from '/imports/intg/sms';
import sendAnalytics from '/imports/intg/sendAnalytics';
import Wechat from '/imports/methods/wechat';
import { addPhoneNumber, queryPhoneNumber } from '/imports/methods/phoneNumber';
import getPlaces from '/imports/methods/getPlaces';
import getSuburb from '/imports/methods/getSuburb';

Meteor.methods({
  addTodo(text) {
    check(text, String); // check the typeof text is String, or exception will be thrown.
    const todos = Todos.insert({
      text,
      completed: false
    });
    // return his todos to get the _id of that in mongodb
    return todos;
  },
  toggleTodo(id) {
    check(id, String); // check the typeof id is String, or exception will be thrown.

    const todoInQuestion = Todos.findOne({ _id: id }, { fields: { completed: true } });
    const completed = todoInQuestion.completed;
    return Todos.update({ _id: id }, { $set: { completed: !completed } });
  },

  getPlaces,
  getSuburb,

  addPhoneNumber,
  queryPhoneNumber,

  getUserIdForLogin,
  passwordResetGetCode,
  setProjectFavorite,
  passwordReset,

  'Wechat.getAccessToken': Wechat.getAccessToken,
  'Wechat.getUserInfo': Wechat.getUserInfo,
  // 'Wechat.checkAccessToken': Wechat.checkAccessToken,
  // 'Wechat.refreshAccessToken': Wechat.refreshAccessToken,

  'SMS.sendCode': sms.sendCode,
  'SMS.verifyCode': sms.verifyCode,
  sendAnalytics,
});

