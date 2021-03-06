import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

/**
 * This function takes what ever comes form Accounts.createUser() as options 
 * Then return a new user to the server. 
 * 
 */
Accounts.onCreateUser(function (options, user) {
  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    user.profile = options.profile;
  }
  if (options.phoneNum) {
    user.phoneNum = options.phoneNum;
  }
  // add a universal avatar to everyone .
  user.profile = {};
  user.profile.avatar = '/images/kitten.png';

  user.roles = options.roles || ['customer'];
  user.roles.map((elm) => {
    Roles.addUsersToRoles(user._id, elm);
  });

  return user;
});


Accounts.validateNewUser((user) => {
  new SimpleSchema({
    _id: { type: String },
    phoneNum: { type: String },
    username: { type: String },
    createdAt: { type: Date },
    roles: { type: [String], blackbox: true },
    profile: { type: Object, blackbox: true },
    services: { type: Object, blackbox: true }
  }).validate(user);

  // Return true to allow user creation to proceed
  return true;
});

Accounts.validateNewUser((user) => {
  if (Meteor.users.findOne({ phoneNum: user.phoneNum })) {
    throw new Meteor.Error(403, "手机号码已经被注册");
  }
  return true;
});