// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
import { ProjectSimpleSchema } from './schemas/Project';
import CollectionBase from './CollectionBase';

const projects = new CollectionBase('projects');
projects.attachSchema(ProjectSimpleSchema);

projects.allow({
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

export default projects;