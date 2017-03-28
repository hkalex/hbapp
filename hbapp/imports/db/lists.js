import { ListSimpleSchema } from './schemas/List';
import CollectionBase from './CollectionBase';

const lists = new CollectionBase('lists');
lists.attachSchema(ListSimpleSchema);

lists.allow({
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

export default lists;
