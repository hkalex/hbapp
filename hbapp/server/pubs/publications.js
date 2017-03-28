import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import {Todos} from '../../imports/db/collection';

const todoPubFields = {
  text: 1,
  completed: 1
};

const getTodoPublication = function (filter, pageSkip = 0) {
  const query = {};

  switch (filter) {
    case 'SHOW_COMPLETED':
      query.completed = true;
      break;
    case 'SHOW_ACTIVE':
      query.completed = false;
      break;
    default:
      break;
  }

  // Counts.publish is a package, that.... counts... -.-
  Counts.publish(this, 'TodoCount', Todos.find(query));
  return Todos.find(query, {
    fields: todoPubFields,
    skip: pageSkip,
    limit: 10
  });
};

Meteor.publish('getTodos', getTodoPublication);
