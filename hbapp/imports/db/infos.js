import { InfoSimpleSchema } from './schemas/Info';
import CollectionBase from './CollectionBase';

const infos = new CollectionBase('infos');
infos.attachSchema(InfoSimpleSchema);

export default infos;
