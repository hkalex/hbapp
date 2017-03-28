import { Meteor } from 'meteor/meteor';
import Orders from '/imports/db/orders';

Meteor.publish('orders', function () {
  return Orders.find();
});