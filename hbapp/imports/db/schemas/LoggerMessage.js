import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const MsgsSimpleSchema = new SimpleSchema({
  type: {
    type: String
  },
  msgTime: {
    type: String
  },
  text: {
    type: String
  },
  url: {
    type: String,
    optional: true
  }
});

export const LoggerMessage = {
  app: {
    type: String
  },
  src: {
    type: String
  },
  version: {
    type: String
  },
  userId: {
    type: String,
    optional: true
  },
  agent: {
    type: String,
    optional: true
  },
  msgs: {
    type: [MsgsSimpleSchema]
  }
};

export const LoggerMessageSimpleSchema = new SimpleSchema(LoggerMessage);