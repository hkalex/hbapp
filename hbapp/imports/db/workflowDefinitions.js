import { WorkflowDefinitionSchema } from 'imports/db/schemas/WorkflowDefinition';
import CollectionBase from './CollectionBase';

const workflowDefinitions = new CollectionBase('workflowDefinitions');
workflowDefinitions.attachSchema(WorkflowDefinitionSchema);

export default workflowDefinitions;
