import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import Projects from '../../imports/db/projects';

const PER_PAGE = 5;
// fields needed for show on Project Listing page. 

const getProjectListPublication = function (filter = {}, page = 1) {

  const projectListFields = {
    title: 1,
    fromPrice: 1,
    topTags: 1,
    tags: 1,
    photos: 1,
    city: 1,
    country: 1,
    floorPlans: 1,
    classes: 1
  };

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
        query['fromPrice.amount'] = { '$gte': fromPrice};
      } else {
        query['$and'] = [ {'fromPrice.amount':{ '$gte' : fromPrice} } ,{'fromPrice.amount': { '$lt': toPrice}}];
      }  
    }
  }
  if(filter.classes) {
    if(filter.classes.code === 'ALL'){
      // do nothing
    } else {
      query.classes = filter.classes.code;        
    }
  }

  return Projects.find(query, {
    fields: projectListFields,
    // skip: page * PER_PAGE_SKIP,
    limit: page * PER_PAGE
  });
};

const getProjectDetailPublication = function (_id = '') {
  _id = new Mongo.ObjectID(_id);
  return Projects.find({ _id });
}

const getRecommentPublication = function () {
  const getRecommentFields = {
    title: 1,
    fromPrice: 1,
    topTags: 1,
    photos: 1,
  }
  return Projects.find({}, { fields: getRecommentFields })
}


Meteor.publish('getRecomment', getRecommentPublication);
Meteor.publish('projectList', getProjectListPublication);
Meteor.publish('getProjectDetail', getProjectDetailPublication);

Meteor.publish('projects', function () {
  return Projects.find();
});

// Meteor.publish('oneProject', function (_id) {
//   return Projects.findOne({ _id: _id });
// });