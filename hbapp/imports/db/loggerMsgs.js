import { LoggerMessageSimpleSchema } from './schemas/LoggerMessage';
import CollectionBase from './CollectionBase';

const loggerMsgs = new CollectionBase('loggerMsgs');
loggerMsgs.attachSchema(LoggerMessageSimpleSchema);

loggerMsgs.allow({
  insert: function () {
    // TODO check user and role
    return true;
  },
  update: function () {
    // TODO check user and role
    return true;
  },
  remove: function() {
    // TODO check user and role
    return true;
  }
});

export default loggerMsgs;
