import { InfoSimpleSchema } from './schemas/Info';
import CollectionBase from './CollectionBase';

const infos = new CollectionBase('infos');
infos.attachSchema(InfoSimpleSchema);

infos.allow({
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

export default infos;
