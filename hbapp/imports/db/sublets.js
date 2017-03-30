import { SubletSchema } from './schemas/Sublet';
import CollectionBase from './CollectionBase';

const sublets = new CollectionBase('sublets');
sublets.attachSchema(SubletSchema);

export default sublets;