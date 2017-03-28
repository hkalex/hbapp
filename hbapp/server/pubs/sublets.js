import { Meteor } from 'meteor/meteor';

import Sublet from '/imports/db/sublets';
import ApprovedSublet from '/imports/db/approvedSublets';

const PER_PAGE = 5;
const getSubletsList = function (filter = {}, page = 1) {
  const query = {};

  // price query
  if (filter.price) {
    const fromPrice = parseInt(filter.price.fromPrice);
    const toPrice = parseInt(filter.price.toPrice);
    if (fromPrice !== -1) {
      if (fromPrice === 130) {
        query['room.rental'] = { '$gte': fromPrice };
      } else {
        query['$and'] = [{ 'room.rental': { '$gte': fromPrice } }, { 'room.rental': { '$lt': toPrice } }];
      }
    }
  }

  // suburb query
  if (filter.suburb) {
    query.suburb = filter.suburb;
  }

  return ApprovedSublet.find(query, { limit: page * PER_PAGE });
}

Meteor.publish('getSubletsList', getSubletsList);

Meteor.publish('sublets', function (id) {
  return Sublet.find({ createdBy: id, status: "draft" });
});

Meteor.publish('subletsList', function () {
  return ApprovedSublet.find();
});

Meteor.publish('mySubletsList', function () {
  return Sublet.find();
});

Meteor.publish('subletRoomList', function () {
  return Sublet.find({ status: "pending" });
});