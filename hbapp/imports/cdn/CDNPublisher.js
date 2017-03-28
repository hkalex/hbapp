import { Meteor } from 'meteor/meteor';
import http from 'http';
import https from 'https';
import uuid from 'node-uuid';

import readAsDom from '/imports/utils/readAsDom';
import putImage from '/imports/cdn/putImage';

function publishImage(img, index) {
  return new Promise((resolve, reject) => {
    if (img.attribs.src) {
      let isBase64 = /^data:image\/\w+;base64,/.test(img.attribs.src);
      if (isBase64) { // base64
        let imgSrc = img.attribs.src;
        let base64Data = imgSrc.replace(/^data:image\/\w+;base64,/, "");
        let imgData = new Buffer(base64Data, 'base64');
        let fileName = uuid.v1() + '.' + imgSrc.replace(/data:image\/([^;]+).*/i, '$1');
        putImage('base64', imgData, fileName, resolve);
      } else { // url
        let isCDN = new RegExp(Meteor.settings.public.CDN_URL).test(img.attribs.src);
        if (!isCDN) { // not in HB CDN
          let url = img.attribs.src || '';
          let request = null;
          if(/^https/.test(url)){
            request = https;
          }else{
            request = http;
          }
          request.get(url, (res) => {
            let imgData = '';
            res.setEncoding('binary');
            res.on('data', (chunk) => {
              imgData += chunk;
            });
            res.on('end', () => {
              let extName = /(\.\w+)(\#.*)?(\?.*)?$/.exec(url);
              let fileName = uuid.v1() + extName[1];
              putImage('url', imgData, fileName, resolve);
            });
          });
        }
      }
    }
  });
}

export default function publishRichTextImages(htmlString) {
  let $ = readAsDom(htmlString);
  return new Promise((resolve, reject) => {
    let images = $('img');
    let imagesArr = Array.from(images);
    Promise.all(imagesArr.map(function (elm, index) {
      return publishImage(elm, index).then(function (cdnUrl) {
        $(elm).attr('src', cdnUrl);
      });
    })).then(function () {
      resolve($.html());
    });
  });
}