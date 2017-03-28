import { Meteor } from 'meteor/meteor';
import Favorites from '/imports/db/favorites';
import Orders from '/imports/db/orders';

const PER_PAGE = 10;

Meteor.publish('favorites', function(userId='', page=1) {
  // check(userId, String);
  return Favorites.find({userId},{ limit: page * PER_PAGE });
});

Meteor.publish('orders', (filter='', userId='', page=1) => {
  const orders = Orders.find({'status.status': filter },{
    limit: PER_PAGE * page
  });

  return orders;
});

// temporary publish phone number .
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},{fields: {phoneNum: 1}});
  } else {
    this.ready();
  }
});

