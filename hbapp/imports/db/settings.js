import { SettingSimpleSchema } from './schemas/Setting';
import CollectionBase from './CollectionBase';

const settings = new CollectionBase('settings');
settings.attachSchema(SettingSimpleSchema);

export default settings;
