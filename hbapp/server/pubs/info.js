import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Info from '../../imports/db/infos';

const PER_PAGE = 5;

const getInfoInDiscoverPublication = function () {
  const getInfoInDiscoverFields = {
    image: 1,
    title: 1,
  }
  return Info.find({}, { fields: getInfoInDiscoverFields })
}


const infoPublication = function (filter = {}, page = 1) {
  // query to DB when subscribe
  let query = {};
  if (filter) {
    if (filter.location) {
      if (filter.location.code === 'ALL' ) {
        // All
      } else {
        query.country = filter.location.text;
      }
    }
    if(filter.classes){
       if (filter.classes.code === 'ALL' ) {
        // All
      } else {
        query.type = filter.classes.code;
      }
    }
  }

  return Info.find(query, {
    limit: page * PER_PAGE
  });
};


const getInfoDetailPublication = function (_id) {
   check(_id, String);
  return Info.find({ _id: Info.ObjectID(_id) });
}


Meteor.publish('info', infoPublication);
Meteor.publish('getInfoInDiscover', getInfoInDiscoverPublication);
Meteor.publish('infoDetail', getInfoDetailPublication);