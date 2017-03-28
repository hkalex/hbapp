import uuid from 'node-uuid';

import OffPlans from '/imports/db/offPlans';
import putImage from '/imports/cdn/putImage';

export function approval(id, imgSrcArr = []) {
  return new Promise((resolve) => {
    let cdnUrlArr = [];
    Promise.all(imgSrcArr.map(function (imgSrc, i) {
      return new Promise((resolve, reject) => {
        let isBase64 = /^data:image\/\w+;base64,/.test(imgSrc);
        if (isBase64) {
          let base64Data = imgSrc.replace(/^data:image\/\w+;base64,/, "");
          let imgData = new Buffer(base64Data, 'base64');
          let fileName = uuid.v1() + '.' + imgSrc.replace(/data:image\/([^;]+).*/i, '$1');
          putImage('base64', imgData, fileName, null, function (cdnUrl) {
            cdnUrlArr[i] = cdnUrl;
            resolve(cdnUrl);
          });
        }
      });
    })).then(function () {
      OffPlans.update(
        { "_id": OffPlans.ObjectID(id) },
        {
          $set: {
            isApproval: true,
            publishedBy: new Date(),
            photos: cdnUrlArr
          }
        }
      );
      resolve(true);
    });
  });
}