import { FS } from 'meteor/cfs:base-package';
import { Meteor } from 'meteor/meteor';

let option = {};

if (Meteor.isServer && Meteor.settings.private.CFS_PATH) {
  option.path = Meteor.settings.private.CFS_PATH;
}

let Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", option)]
});

Images.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  download: function () {
    return true;
  }
});

export default Images;