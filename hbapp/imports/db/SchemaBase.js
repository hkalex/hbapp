import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import DN from '/imports/dn';
import WorkflowFactory from '/imports/wf/WorkflowFactory';

export default class SchemaBase extends SimpleSchema {
  constructor(...args) {
    let newSchema = Object.assign(args[0], {
      DN: {
        type: Object,
        optional: true,
        blackbox: true
      },
      WF: {
        type: Object,
        optional: true,
        blackbox: true
      }
    });
    args[0] = newSchema;
    super(...args);
  }

  attachWorkflow(workflowName) {
    this._workflowName = workflowName;
    this._WorkflowFactory = new WorkflowFactory(this);
  }

  getWorkflowFactory() {
    return this._WorkflowFactory;
  }



  attachRelationship(relationship) {
    this._relationship = relationship;
    this._denormaliser = new DN.Denormaliser(this);
  }
  
  getDenormaliser() {
    return this._denormaliser;
  }

  getRelationships() {
    return this._relationship;
  }
}