import { Meteor } from 'meteor/meteor';
import Languages from '/imports/db/languages';

Meteor.publish('languages', function() {
  return Languages.find();
});