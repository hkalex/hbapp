import { LanguageSimpleSchema } from './schemas/Language';
import CollectionBase from './CollectionBase';

const languages = new CollectionBase('languages');
languages.attachSchema(LanguageSimpleSchema);

languages.allow({
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

export default languages;