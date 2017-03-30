import { ListSimpleSchema } from './schemas/List';
import CollectionBase from './CollectionBase';

const lists = new CollectionBase('lists');
lists.attachSchema(ListSimpleSchema);

export default lists;
