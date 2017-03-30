import { Meteor } from 'meteor/meteor';
import { UserSimpleSchema } from '/imports/db/schemas/User';

Meteor.startup(() => {
  Meteor.users.attachSchema(UserSimpleSchema);
});