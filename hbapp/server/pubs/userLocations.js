import { Meteor } from 'meteor/meteor';
import {check} from 'meteor/check';
import UserLocations from '/imports/db/userLocations';

Meteor.publish('userLocations', function (userId) {
  check(userId, String);
  return UserLocations.find({userId});
});
