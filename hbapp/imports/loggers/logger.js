import { Meteor } from 'meteor/meteor';

let logger = null;

if (Meteor.isServer) {
  logger = new (require('./ServerLogger').default)();
} else if (Meteor.isClient) {
  logger = new (require('./ClientLogger').default)();
} else if (Meteor.isCordova) {
  logger = new (require('./MobileLogger').default)();
}

export default logger;
