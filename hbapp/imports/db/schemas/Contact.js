import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PhotoSimpleSchema } from './Photo';

export const Contact = {
  name: {
    type: String
  },
  email: {
    type: String
  },
  photo: {
    type: PhotoSimpleSchema
  },
  weChat: {
    type: String
  },
  weChatQR: {
    type: PhotoSimpleSchema
  }
}

export const ContactSimpleSchema = new SimpleSchema(Contact);