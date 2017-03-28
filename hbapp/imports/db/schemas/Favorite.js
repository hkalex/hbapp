import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { PhotoSimpleSchema } from './Photo';

export const Favorite = {
  userId: {
    type: String
  },
  projects: {
    // i can't put the schema here, or insert of the projects will fail.
    // TODO: figure out wthat happen there and give schema here.
    type: [Object], blackbox: true
  }

}

export const FavoriteSimpleSchema = new SimpleSchema(Favorite);

// useless for now. 
const FavoriteItemSimpleSchema = new SimpleSchema({
  projectId: {
    type: String
  },
  projectName: {
    type: String
  },
  photo: {
    type: PhotoSimpleSchema
  },
  agentInfo: {
    type: AgentInfoSimpleSchema,
    optional: true,
  }
});

const AgentInfoSimpleSchema = new SimpleSchema({
  agentId: {
    type: String
  }
});