import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import logger from '../loggers/logger';
import Project from '/imports/db/projects';
import Order from '/imports/db/orders';

export function orderSetupAfterCreate(orderId) {

  const order = Order.findOne({_id: orderId});
  const project = Project.findOne({_id: Project.ObjectID(order.projectId)});

  const projectInfo = {
    projectId : project._id._str,
    projectName: project.title,
    projectImage: project.photos[0],
    price: project.fromPrice,
    address: project.address,
    expectedSettleAt: project.expectedSettleAt,
    projectTags: project.topTags
  };

  // console.log(projectInfo)


    Order.update({_id: orderId}, {
      '$set': {
        'DN': Object.assign({}, order.DN, {
          project: projectInfo
        }) 
      }
    });


  return true

  // const userFavorite = Favorite.findOne({userId});
  // if(userFavorite){
  //   // if user Favorite alr exists

  //   // check if already favorited. 
  //   let alrFavorite = false;
  //   const newUserFavoriteList = userFavorite.projects.filter((info) => {
  //     if(info && info.projectId == projectId){
  //       // if so , delete it from the user's favorite list
  //       alrFavorite = true;
  //       return false;
  //     }
  //     return true;
  //   });

  //   // if not favorited by user, then add it to favorite
  //   if(!alrFavorite){
  //     newUserFavoriteList.push(projectInfo);
  //   }

  //   Favorite.update({userId}, { '$set': {projects: newUserFavoriteList} });
    
  // } else {
  //   // if first favorite, create new user favorite
  //   Favorite.insert({
  //     userId,
  //     projects: [projectInfo]
  //   });
  // }
}