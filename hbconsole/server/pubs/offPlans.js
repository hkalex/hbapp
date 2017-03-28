import { Meteor } from 'meteor/meteor';
import OffPlans from '/imports/db/offPlans';

Meteor.publish('offPlans', function () {
  return OffPlans.find();
});