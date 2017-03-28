import fs from 'fs';
import http from 'http';
import https from 'https';
import uuid from 'node-uuid';

import uploadFile from '/imports/intg/uploadFile';
import getCDNURL from '/imports/utils/getCDNURL';

export default function putImage(type, imgData, fileName, resolve, success) {
  let filePath = 'temp/images/' + fileName;
  if (!fs.existsSync('temp')) {
    fs.mkdirSync('temp');
    fs.mkdirSync('temp/images');
  }
  let encoding = null;
  if (type === 'url') {
    encoding = 'binary';
  }

  fs.writeFile(filePath, imgData, encoding, (err) => {
    if (!err) {
      uploadFile.put({
        objectKey: 'images/' + fileName,
        filePath: filePath
      }, (err, result) => {
        if (result) {
          if (resolve) {
            resolve(getCDNURL('images/' + fileName));
          }
          fs.unlink(filePath);
          if (success) {
            success(getCDNURL('images/' + fileName));
          }
        }
      });
    }
  });
}

export function putBase64Arr(imgArr, callback) {
  let tempArr = [];
  Promise.all(imgArr.map((imgSrc, i) => {
    return new Promise((resolve, reject) => {
      let isBase64 = /^data:image\/\w+;base64,/.test(imgSrc);
      if (isBase64) {
        let base64Data = imgSrc.replace(/^data:image\/\w+;base64,/, "");
        let imgData = new Buffer(base64Data, 'base64');
        let fileName = uuid.v1() + '.' + imgSrc.replace(/data:image\/([^;]+).*/i, '$1');
        putImage('base64', imgData, fileName, null, function (cdnUrl) {
          tempArr[i] = cdnUrl;
          resolve(cdnUrl);
        });
      } else {
        tempArr[i] = imgSrc;
        resolve(imgSrc);
      }
    });
  })).then(() => {
    callback(tempArr);
  });
}

export function putUrlImg(imgUrl = '', callback) {
  let isCDN = new RegExp(Meteor.settings.public.CDN_URL).test(imgUrl);
  if (!isCDN) { // not in HB CDN
    let request = null;
    if (/^https/.test(imgUrl)) {
      request = https;
    } else {
      request = http;
    }
    request.get(imgUrl, (res) => {
      let imgData = '';
      res.setEncoding('binary');
      res.on('data', (chunk) => {
        imgData += chunk;
      });
      res.on('end', () => {
        let fileName = uuid.v1() + '.png';
        putImage('url', imgData, fileName, null, callback);
      });
    });
  } else {
    callback(imgUrl);
  }
}