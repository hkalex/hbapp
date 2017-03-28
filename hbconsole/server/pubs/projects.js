import { Meteor } from 'meteor/meteor';
import Projects from '../../imports/db/projects';
import Lists from '../../imports/db/lists';
import Images from '../../imports/db/images';

const PER_PAGE = 5;
// fields needed for show on Project Listing page. 

const getProjectListPublication = function (filter = {}, page = 0) {

  const projectListFields = {
    title: 1,
    fromPrice: 1,
    topTags: 1,
    tags: 1,
    photos: 1,
    city: 1,
    country: 1,
  };

  const query = filter;
  // TODO: set query to find what i needed 
  // filter is what i get from Project List tags header 


  return Projects.find(query, {
    fields: projectListFields,
    // skip: page * PER_PAGE_SKIP,
    limit: page * PER_PAGE
  });
};

const getProjectDetailPublication = function(_id= '') {
  return Projects.find({ _id });
}

Meteor.publish('getProjectLists', getProjectListPublication);
Meteor.publish('getProjectDetail', getProjectDetailPublication);

Meteor.publish('projects', function () {
  return Projects.find();
});