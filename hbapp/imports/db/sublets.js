import { SubletSchema } from './schemas/Sublet';
import CollectionBase from './CollectionBase';

const sublets = new CollectionBase('sublets');
sublets.attachSchema(SubletSchema);

sublets.allow({
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

export default sublets;