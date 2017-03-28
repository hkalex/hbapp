import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ListItemSimpleSchema } from './ListItem';

export const List = {
  title: {
    type: String
  },
  code: {
    type: String
  },
  detail: {
    type: [ListItemSimpleSchema]
  }
};

export const ListSimpleSchema = new SimpleSchema(List);