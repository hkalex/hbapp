import { OffplanSimpleSchema } from './schemas/OffPlan';
import CollectionBase from './CollectionBase';

const offPlans = new CollectionBase('offPlans');
offPlans.attachSchema(OffplanSimpleSchema);

export default offPlans;