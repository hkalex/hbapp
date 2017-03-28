import { PostcodeSchema } from './schemas/Postcode';
import CollectionBase from './CollectionBase';

const postcodes = new CollectionBase('postcodes');
postcodes.attachSchema(PostcodeSchema);

postcodes.allow({
  insert: function () {
    // TODO check user and role
    return true;
  },
  update: function () {
    // TODO check user and role
    return true;
  },
  remove: function () {
    // TODO check user and role
    return true;
  }
});

export default postcodes;