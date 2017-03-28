import { Meteor } from 'meteor/meteor';
import Sublet from '/imports/db/sublets';

Meteor.publish('sublets', function () {
  return Sublet.find();
});

Meteor.publish('oneSublet', function (id) {
  return Sublet.findOne({ _id: id });
});