import { Meteor } from 'meteor/meteor';
import Infos from '/imports/db/infos';

Meteor.publish('infos', function() {
  return Infos.find();
});