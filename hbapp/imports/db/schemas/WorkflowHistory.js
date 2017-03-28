import SchemaBase from '/imports/db/SchemaBase';

export const WorkflowHistory = {
  collection: {
    type: String
  },
  objectId: {
    type: Object
  },
  fromState: {
    type: String,
    optional: true
  },
  toState: {
    type: String
  },
  msg: {
    type: String,
    optional: true
  },
  options: {
    type: Object,
    optional: true,
    blackbox: true
  },
  by: {
    type: String
  },
  at: {
    type: Date
  }
};

export const WorkflowHistorySchema = new SchemaBase(WorkflowHistory);
