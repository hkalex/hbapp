import { Meteor } from 'meteor/meteor';
import Setting from '/imports/db/settings';

Meteor.publish('settings', function() {
  return Setting.find();
});