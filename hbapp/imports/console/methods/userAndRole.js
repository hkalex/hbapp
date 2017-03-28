import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

export function setUserRoles(userId, rolesArr) {
  Roles.setUserRoles(userId, rolesArr);
}

export function createNewUser(userInfo) {
  return new Promise((resolve, reject) => {
    const newUserId = Accounts.createUser(userInfo);
    if (newUserId) {
      resolve(true);
    } else {
      reject(new Meteor.Error('create failed'));
    }
  });
}

export function createRole(roleName) {
  Roles.createRole(roleName);
}