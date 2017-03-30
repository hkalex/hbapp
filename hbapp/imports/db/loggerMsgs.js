import { LoggerMessageSimpleSchema } from './schemas/LoggerMessage';
import CollectionBase from './CollectionBase';

const loggerMsgs = new CollectionBase('loggerMsgs');
loggerMsgs.attachSchema(LoggerMessageSimpleSchema);

export default loggerMsgs;
