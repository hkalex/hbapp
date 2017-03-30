import { LanguageSimpleSchema } from './schemas/Language';
import CollectionBase from './CollectionBase';

const languages = new CollectionBase('languages');
languages.attachSchema(LanguageSimpleSchema);

export default languages;