// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
import { ProjectSimpleSchema } from './schemas/Project';
import CollectionBase from './CollectionBase';

const projects = new CollectionBase('projects');
projects.attachSchema(ProjectSimpleSchema);

export default projects;