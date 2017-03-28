import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Lists from '/imports/db/lists';

Meteor.publish('list', function(code) {
  check(code, String);
  return Lists.find({code: code});
});

Meteor.publish('lists', function() {
  return Lists.find();
});