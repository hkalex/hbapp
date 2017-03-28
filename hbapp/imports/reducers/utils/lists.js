import logger from '../../loggers/logger';

export default function lists(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_LISTS':
      logger.debug(action);

      // TODO: what front end should do when register is successful
      return Object.assign({}, state, action.lists);
    default:
      return state;
  }
}
