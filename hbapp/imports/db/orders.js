import { OrderSimpleSchema } from './schemas/Order';
import CollectionBase from './CollectionBase';

const orders = new CollectionBase('orders');
orders.attachSchema(OrderSimpleSchema);

orders.allow({
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

export default orders;
