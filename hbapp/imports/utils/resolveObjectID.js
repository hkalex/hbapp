import { Mongo } from 'meteor/mongo';

/**
 * @description This function resolve the ObjectID from Mongo string id.
 */
export default function resolveObjectID(strId) {
  if (strId instanceof Mongo.ObjectID) {
    return strId;
  } else {
    if (strId && typeof strId === 'string') {
      if (strId.length === 17) {
        return strId;
      } else {
        return new Mongo.ObjectID(strId);
      }
    } else {
      return strId;
    }
  }
}