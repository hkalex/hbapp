import BaseLogger from './BaseLogger';
import loggerMsgs from '/imports/db/loggerMsgs';
import C from '/imports/consts/Constants';

export default class ServerLogger extends BaseLogger {
  // everything is from BaseLogger
  constructor() {
    super();
    const _id = loggerMsgs.insert({
      app: C.APP_CODE,
      src: "S",
      version: C.APP_VERSION,
      userId: "",
      agent: "",
      msgs: []
    });
    super.setId(_id);
  }
}