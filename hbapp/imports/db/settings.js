import { SettingSimpleSchema } from './schemas/Setting';
import CollectionBase from './CollectionBase';

const settings = new CollectionBase('settings');
settings.attachSchema(SettingSimpleSchema);

settings.allow({
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

export default settings;
