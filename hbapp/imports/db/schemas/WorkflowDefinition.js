import SchemaBase from '/imports/db/SchemaBase';

/// Please refer to:
/// https://github.com/jakesgordon/javascript-state-machine


export const WorkflowDefinition = {
  initial: {
    type: Object,
    optional: true,
    blackbox: true
  },
  events: {
    type: Object,
    optional: false,
    blackbox: true
  },
  callbacks: {
    type: Object,
    optional: true,
    blackbox: true
  }
};

export const WorkflowDefinitionSchema = new SchemaBase(WorkflowDefinition);
