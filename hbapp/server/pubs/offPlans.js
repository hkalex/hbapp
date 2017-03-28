import { Meteor } from 'meteor/meteor';
import OffPlans from '/imports/db/offPlans';

Meteor.publish('offPlans', function () {
  return OffPlans.find();
});

const PER_PAGE = 5;
// fields needed for show on Project Listing page. 

const getOffPlanListPublication = function (filter = {}, page = 1) {

  // const projectListFields = {
  //   title: 1,
  //   photos: 1,
  //   city: 1,
  //   country: 1,
  //   floorPlans: 1,
  //   shortDesc: 1
  // };

  let query = {};
  // TODO: set query to find what i needed 
  // filter is what i get from Project List tags header
  if (filter.location) {
    if(filter.location.country === 'ALL') {
      // generate a clean filter 

    } else {
      if (filter.location.city === 'ALL'){
        query.country = filter.location.country;
      } else {
        // search both country and city
        query.country = filter.location.country;
        query.city = filter.location.city;
      }
    }
  }

  if (filter.price) {
    const fromPrice = parseInt(filter.price.fromPrice);
    const toPrice = parseInt(filter.price.toPrice);
    if(fromPrice === -1){
      // do nothing
    } else {
      if(fromPrice === 9000000){
        query['amount'] = { '$gte': fromPrice};
      } else {
        query['$and'] = [ {'amount':{ '$gte' : fromPrice} } ,{'amount': { '$lt': toPrice}}];
      }  
    }
  }
  // if(filter.classes) {
  //   if(filter.classes.code === 'ALL'){
  //     // do nothing
  //   } else {
  //     query.classes = filter.classes.code;        
  //   }
  // }

  return OffPlans.find(query, {
    // fields: projectListFields,
    // skip: page * PER_PAGE_SKIP,
    limit: page * PER_PAGE
  });
};




Meteor.publish('offPlanList', getOffPlanListPublication);