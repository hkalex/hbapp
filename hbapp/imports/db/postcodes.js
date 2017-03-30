import { PostcodeSchema } from './schemas/Postcode';
import CollectionBase from './CollectionBase';

const postcodes = new CollectionBase('postcodes');
postcodes.attachSchema(PostcodeSchema);

export default postcodes;