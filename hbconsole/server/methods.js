import { Meteor } from 'meteor/meteor';

import { getUserIdForLogin } from '../imports/methods/user';
import { setProjectFavorite } from '/imports/methods/project';
import { orderSetupAfterCreate } from '/imports/methods/order';
import sms from '/imports/intg/sms';
import sendAnalytics from '/imports/intg/sendAnalytics';
import { projectPublish, projectUnpublish } from '/imports/console/methods/publishProjectsImages';
import { photoPublish, photoUnpublish } from '/imports/console/methods/publishPhoto';
import {
  queryCollection,
  insertCollection,
  removeCollection,
  updateCollection
} from '/imports/console/methods/manageMongo';
import { setUserRoles, createNewUser, createRole } from '/imports/console/methods/userAndRole';
import { approval } from '/imports/console/methods/approval';
import { subletApproval } from '/imports/console/methods/subletApproval';

Meteor.methods({
  getUserIdForLogin,
  setProjectFavorite,

  setUserRoles,
  createNewUser,
  createRole,

  approval,
  subletApproval,

  queryCollection,
  insertCollection,
  removeCollection,
  updateCollection,

  projectPublish,
  projectUnpublish,
  photoPublish,
  photoUnpublish,

  'SMS.sendCode': sms.sendCode,
  'SMS.verifyCode': sms.verifyCode,
  sendAnalytics,

  // orders on the console side.
  orderSetupAfterCreate
});

