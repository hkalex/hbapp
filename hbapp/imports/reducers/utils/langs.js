import logger from '../../loggers/logger';

export default function langs(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_LANGS':
      logger.debug(action);

      // TODO: what front end should do when register is successful
      return Object.assign({}, state, action.langs);
    default:
      return state;
  }
}
