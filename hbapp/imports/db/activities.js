import { ActivitySimpleSchema } from './schemas/Activity';
import CollectionBase from './CollectionBase';

const activities = new CollectionBase('activities');
activities.attachSchema(ActivitySimpleSchema);

activities.allow({
  insert: function () {
    // TODO check user and role
    return true;
  },
  update: function () {
    // TODO check user and role
    return true;
  },
  remove: function() {
    // TODO check user and role
    return true;
  }
});

export default activities;
