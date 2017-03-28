import { ApprovedSubletSchema } from './schemas/ApprovedSublet';
import CollectionBase from './CollectionBase';

const approvedSublets = new CollectionBase('approvedSublets');
approvedSublets.attachSchema(ApprovedSubletSchema);

approvedSublets.allow({
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

export default approvedSublets;