import { ApprovedSubletSchema } from './schemas/ApprovedSublet';
import CollectionBase from './CollectionBase';

const approvedSublets = new CollectionBase('approvedSublets');
approvedSublets.attachSchema(ApprovedSubletSchema);

export default approvedSublets;