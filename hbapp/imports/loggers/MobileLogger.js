import { Meteor } from 'meteor/meteor';
import BaseLogger from './BaseLogger';
import loggerMsgs from '/imports/db/loggerMsgs';
import C from '/imports/consts/Constants';

export default class MobileLogger extends BaseLogger {
  // everything is from BaseLogger
  constructor() {
    super();
    const _id = loggerMsgs.insert({
      app: C.APP_CODE,
      src: "M",
      version: C.APP_VERSION,
      userId: Meteor.userId() || "",
      agent: window.navigator.userAgent,
      msgs: []
    });
    super.setId(_id);
  }
}