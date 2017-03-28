import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import logger from '../loggers/logger';
import Favorite from '/imports/db/favorites';
import Project from '/imports/db/projects';




/**
 * 3 steps. 
 * check user favorite, if exists, delete, if not , add.
 * add the record to order.
 * 
 * @export
 * @param {any} projectId
 */
export function setProjectFavorite(projectId) {

  const userId = Meteor.user()._id;
  const project = Project.findOne({_id: Project.ObjectID(projectId)});

  const projectInfo = {
    projectId,
    projectName: project.title,
    projectImage: project.photos[0],
    projectPrice: project.fromPrice,
    projectTag: project.topTags, 
  };

  const userFavorite = Favorite.findOne({userId});
  if(userFavorite){
    // if user Favorite alr exists

    // check if already favorited. 
    let alrFavorite = false;
    const newUserFavoriteList = userFavorite.projects.filter((info) => {
      if(info && info.projectId == projectId){
        // if so , delete it from the user's favorite list
        alrFavorite = true;
        return false;
      }
      return true;
    });

    // if not favorited by user, then add it to favorite
    if(!alrFavorite){
      newUserFavoriteList.push(projectInfo);
    }

    Favorite.update({userId}, { '$set': {projects: newUserFavoriteList} });
    
  } else {
    // if first favorite, create new user favorite
    Favorite.insert({
      userId,
      projects: [projectInfo]
    });
  }
  
  // const user = Meteor.user();
  // console.log(user)

  // if(user.favorite){
  //   if(_.includes(user.favorite, projectId)) {
  //     const favoriteList = _.without(user.favorite, projectId);
  //     const updateStatus = Meteor.users.update(
  //       { _id: userId },
  //       { '$set': { favorite: favoriteList } } );
  //   } else {
  //     const updateStatus = Meteor.users.update(
  //       { _id: userId },
  //       { '$push': {  favorite: projectId } } );
  //   }

  // } else {
  //   // if first favorite.
  //   const favoriteList = [projectId];
  //   const updateStatus = Meteor.users.update(
  //   { _id: userId },
  //   { '$set': { favorite: favoriteList } } );
  // }
}