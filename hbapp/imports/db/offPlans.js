import { OffplanSimpleSchema } from './schemas/OffPlan';
import CollectionBase from './CollectionBase';

const offPlans = new CollectionBase('offPlans');
offPlans.attachSchema(OffplanSimpleSchema);

offPlans.allow({
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

export default offPlans;