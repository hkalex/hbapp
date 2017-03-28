import { Meteor } from 'meteor/meteor';

import Sublets from '/imports/db/sublets';
import ApprovedSublets from '/imports/db/approvedSublets';
import Postcodes from '/imports/db/postcodes';
import { putBase64Arr, putUrlImg } from '/imports/cdn/putImage';

function updateDB(sublet, tempSublet) {
  // store the postcode
  if (sublet.addressDetail) {
    const record = Postcodes.findOne({ suburb: sublet.addressDetail.suburb.toUpperCase() });
    tempSublet.addressDetail.postcode = record.postcode;
  }

  // change status, add publishedAt, publishedBy
  tempSublet.status = 'approved';
  tempSublet.publishedAt = new Date();
  tempSublet.publishedBy = this.userId;
  // update the mongodb
  Sublets.update({ _id: sublet._id }, { $set: tempSublet });

  // add approvedSublet
  var l = sublet.room.length;
  if (l !== 0) {
    ApprovedSublets.remove({ parentId: sublet._id._str });
    for (var i = 0; i < l; i++) {
      const approvedSublet = Object.assign({}, tempSublet);
      approvedSublet.parentId = sublet._id._str || '';
      approvedSublet.room = tempSublet.room[i];
      ApprovedSublets.insert(approvedSublet);
    }
  }

  return tempSublet;
}

export function subletApproval(sublet) {
  return new Promise((resolve) => {
    let tempSublet = {};
    Object.assign(tempSublet, sublet);

    let staticUrl = '';
    if (Meteor.settings.public.GOOGLE_MAP_REGION === 'cn') {
      staticUrl = `https://maps.google.cn/maps/api/staticmap?size=800x400&maptype=roadmap&markers=color:red%7C${sublet.address}&key=${Meteor.settings.public.GOOGLE_MAP_KEY}`;
    } else {
      staticUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x400&maptype=roadmap&markers=color:red%7C${sublet.address}&key=${Meteor.settings.public.GOOGLE_MAP_KEY}`;
    }

    // upload sublet images to cdn
    putBase64Arr(sublet.images, (arr1) => {
      tempSublet.images = arr1;
      // upload room images to cdn
      if (sublet.room) {
        Promise.all(sublet.room.map((room, i) => {
          return new Promise((resolve1) => {
            putBase64Arr(room.images, (arr2) => {
              tempSublet.room[i].images = arr2;
              resolve1(arr2);
            });
          });
        })).then(() => {
          // upload static map image to cdn
          putUrlImg(staticUrl, (cdnUrl) => {
            tempSublet.staticMap = cdnUrl;
            tempSublet = updateDB(sublet, tempSublet);
            resolve(tempSublet);
          });
        });
      } else {
        // upload static map image to cdn
        putUrlImg(staticUrl, (cdnUrl) => {
          tempSublet.staticMap = cdnUrl;
          tempSublet = updateDB(sublet, tempSublet);
          resolve(tempSublet);
        });
      }
    });
  });
}