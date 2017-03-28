import logger from '../../loggers/logger';

export default function snackbar(state = {
  message: ''
}, action = {}) {
  switch (action.type) {
    case 'SIMPLE_SNACKBAR':
      // TODO: what front end should do when register is successful
      return Object.assign({},state, {
        message: action.payload.message
      });
    default:
      return state;
  }
}
