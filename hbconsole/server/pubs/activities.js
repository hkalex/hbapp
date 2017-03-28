import { Meteor } from 'meteor/meteor';
import Activities from '/imports/db/activities';

Meteor.publish('activities', function() {
  return Activities.find();
});