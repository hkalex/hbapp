import { OrderSimpleSchema } from './schemas/Order';
import CollectionBase from './CollectionBase';

const orders = new CollectionBase('orders');
orders.attachSchema(OrderSimpleSchema);

export default orders;
