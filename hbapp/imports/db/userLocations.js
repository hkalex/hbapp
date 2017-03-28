import { UserLocationSchema } from './schemas/UserLocationSchema.js';
import CollectionBase from './CollectionBase';

const userLocations = new CollectionBase('userLocations');
userLocations.attachSchema(UserLocationSchema);

export default userLocations;
