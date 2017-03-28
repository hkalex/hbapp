import { Meteor } from 'meteor/meteor';
import path from 'path';

import Projects from '/imports/db/projects';
import images from '/imports/db/images';
import getCDNURL from '/imports/utils/getCDNURL';
import uploadFile from '/imports/intg/uploadFile';
import publishRichTextImages from '/imports/cdn/CDNPublisher';

export const projectPublish = function (project) {
  return new Promise((resolve) => {
    // upload images to CDN
    let photos = [];
    let floorPlans = [];

    let imageRootPath = '';
    if (Meteor.isServer && Meteor.settings.private.CFS_PATH) {
      imageRootPath = path.resolve(Meteor.settings.private.CFS_PATH);
    } else {
      imageRootPath = path.resolve('../../../cfs/files/images/');
    }

    let pfpArr = []; // photoFileParams
    for (let i = 0, len = project.photos.length; i < len; i++) {
      const imageKey = images.findOne({ "_id": project.photos[i].image }).copies.images.key;

      pfpArr.push({
        objectKey: `images/${imageKey}`,
        filePath: `${imageRootPath}/${imageKey}`
      });

      let photo = Object.assign({}, project.photos[i], {
        cdnUrl: getCDNURL(`images/${imageKey}`)
      });
      photos.push(photo);
    }
    uploadFile.put(pfpArr);

    let fppfpArr = []; // floorPlansPhotoFileParams
    for (let i = 0, len = project.floorPlans.length; i < len; i++) {
      let floorPlansPhotos = [];
      for (let j = 0, len = project.floorPlans[i].photos.length; j < len; j++) {
        const imageKey = images.findOne({ "_id": project.floorPlans[i].photos[j].image }).copies.images.key;

        fppfpArr.push({
          objectKey: `images/${imageKey}`,
          filePath: `${imageRootPath}/${imageKey}`
        });
        let floorPlansPhoto = Object.assign({}, project.floorPlans[i].photos[j], {
          cdnUrl: getCDNURL(`images/${imageKey}`)
        });
        floorPlansPhotos.push(floorPlansPhoto);
      }

      let floorPlan = Object.assign({}, project.floorPlans[i], {
        photos: floorPlansPhotos
      });
      floorPlans.push(floorPlan);
    }
    uploadFile.put(fppfpArr);

    publishRichTextImages(project.desc).then(function (result) {
      // update isPublished, publishedAt, publishedBy, cdnUrl value
      Projects.update(
        { "_id": project._id },
        {
          $set: {
            "desc": result,
            "isPublished": true,
            "publishedAt": new Date(),
            "publishedBy": Meteor.userId(),
            "photos": photos,
            "floorPlans": floorPlans
          }
        },
        true
      );
      resolve(true);
    });


  });
}

export const projectUnpublish = function (project) {
  return new Promise((resolve) => {
    Projects.update(
      { "_id": project._id },
      {
        $set: {
          "isPublished": false
        }
      },
      true
    );
    resolve(true);
  });
}