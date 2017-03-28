import { Meteor } from 'meteor/meteor';
import path from 'path';

import Infos from '/imports/db/infos';
import Activities from '/imports/db/activities';
import images from '/imports/db/images';
import getCDNURL from '/imports/utils/getCDNURL';
import uploadFile from '/imports/intg/uploadFile';
import publishRichTextImages from '/imports/cdn/CDNPublisher';

export const photoPublish = function (obj, collectionsName) {
  return new Promise((resolve) => {
    // upload images to CDN
    let photos = [];

    let imageRootPath = '';
    if (Meteor.isServer && Meteor.settings.private.CFS_PATH) {
      imageRootPath = path.resolve(Meteor.settings.private.CFS_PATH);
    } else {
      imageRootPath = path.resolve('../../../cfs/files/images/');
    }

    let pfpArr = []; // photoFileParams
    for (let i = 0, len = obj.image.length; i < len; i++) {
      const imageKey = images.findOne({ "_id": obj.image[i].image }).copies.images.key;

      pfpArr.push({
        objectKey: `images/${imageKey}`,
        filePath: `${imageRootPath}/${imageKey}`
      });

      let photo = Object.assign({}, obj.image[i], {
        cdnUrl: getCDNURL(`images/${imageKey}`)
      });
      photos.push(photo);
    }
    uploadFile.put(pfpArr);

    publishRichTextImages(obj.detail).then(function (result) {
      let Collection = null;
      if (collectionsName === 'infos') {
        Collection = Infos;
      } else if (collectionsName === 'activities') {
        Collection = Activities;
      }
      
      // update isPublished, publishedAt, publishedBy, cdnUrl value
      Collection.update(
        { "_id": obj._id },
        {
          $set: {
            "detail": result,
            "isPublished": true,
            "publishedAt": new Date(),
            "publishedBy": Meteor.userId(),
            "image": photos
          }
        },
        true
      );
      resolve(true);
    });
  });
}

export const photoUnpublish = function (obj, collectionsName) {
  return new Promise((resolve) => {
    let Collection = null;
    if (collectionsName === 'infos') {
      Collection = Infos;
    } else if (collectionsName === 'activities') {
      Collection = Activities;
    }
    Collection.update(
      { "_id": obj._id },
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