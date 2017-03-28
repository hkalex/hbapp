import { Meteor } from 'meteor/meteor';

export function addPhoneNumber(number) {
  Meteor.users.update(
    { _id: Meteor.userId() },
    { $set: { phoneNum: number } }
  );
  return true;
}

export function queryPhoneNumber() {
  const user = Meteor.users.findOne({ _id: Meteor.userId() });
  if (user.phoneNum) {
    return user.phoneNum;
  }
}