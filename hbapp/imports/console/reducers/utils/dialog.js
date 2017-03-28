import logger from '/imports/loggers/logger';

export default function dialog(state = {
  title:'',
  message: ''
}, action = {}) {
  switch (action.type) {
    case 'SIMPLE_DIALOG':
      logger.log(action)
      // TODO: what front end should do when register is successful
      return Object.assign({},state, {
        title: action.message.title,
        message: action.message.message
      });
    default:
      return state;
  }
}
