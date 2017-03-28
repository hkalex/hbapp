import { Meteor } from 'meteor/meteor';
import OSS from 'ali-oss';
import co from 'co';
import _ from 'lodash';

class UploadFile {
  constructor() {
    this.client = new OSS({
      region: Meteor.settings.private.CDN_REGION,
      accessKeyId: Meteor.settings.private.CDN_ACCESS_KEY_ID,
      accessKeySecret: Meteor.settings.private.CDN_ACCESS_KEY_SECRET,
      bucket: Meteor.settings.private.CDN_BUCKET
    });
  }

  /**
   * @param {any} obj
   * obj: {
   *  objectKey,
   *  filePath
   * }
   * or [obj, obj, ...]
   * @memberOf UploadFile
   */
  put(obj, callback) {
    const self = this;
    if (_.isPlainObject(obj)) {
      co(function* () {
        if (obj.objectKey && obj.filePath) {
          const result = yield self.client.put(obj.objectKey, obj.filePath);
          callback(null, result);
        } else {
          callback(new Meteor.Error('No objectKey or filePath'));
        }
      }).catch(function (err) {
        throw err;
      });
    } else if (_.isArray(obj)) {
      co(function* () {
        for (let i = 0, len = obj.length; i < len; i++) {
          if (obj[i].objectKey && obj[i].filePath) {
            const result = yield self.client.put(obj[i].objectKey, obj[i].filePath);
            callback(null, result);
          } else {
            callback(new Meteor.Error('No objectKey or filePath'));
          }
        }
      }).catch(function (err) {
        throw err;
      });
    } else {
      throw new Meteor.Error('Unknown type', 'Support only in object and array');
    }
  }
}

const uploadFile = new UploadFile();

export default uploadFile;