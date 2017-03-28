import { Meteor } from 'meteor/meteor';
import Activity from '/imports/db/activities';
import { check } from 'meteor/check';

const PER_PAGE = 5;

const getActivityInDiscoverPublication = function () {
  const fields = {
    image: 1,
    title: 1,
  }
  return Activity.find({}, { fields, limit: 5 })
}

const activityPublication = function (filter = {}, page = 1) {

  // filter is the filter in store, 
  // reconstruct query to query DB.
  let query = {};
  if (filter.location) {
    if (filter.location.code === 'ALL') {
      // do nothing
    } else {
      query.city = filter.location.text;
    }
  }

  return Activity.find(query, {
    // fields: projectListFields,
    // skip: page * PER_PAGE_SKIP,
    limit: page * PER_PAGE
  });
};

Meteor.publish('activity', activityPublication);

Meteor.publish('activityDetail', function (_id) {
  check(_id, String);
  return Activity.find({ _id: Activity.ObjectID(_id) });
});

Meteor.publish('getActivityInDiscover', getActivityInDiscoverPublication);