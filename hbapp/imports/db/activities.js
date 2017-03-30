import { ActivitySimpleSchema } from './schemas/Activity';
import CollectionBase from './CollectionBase';

const activities = new CollectionBase('activities');
activities.attachSchema(ActivitySimpleSchema);

export default activities;
