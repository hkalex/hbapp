import { Meteor } from 'meteor/meteor';
import { UserSimpleSchema } from '/imports/db/schemas/User';
import Roles from 'meteor/alanning:roles';

Meteor.startup(() => {
  Meteor.users.attachSchema(UserSimpleSchema);
});