import logger from '../../loggers/logger';

export default function dialog(state = {
  type: '',
  content: {}
}, action = {}) {
  switch (action.type) {
    case 'SIMPLE_DIALOG':
      logger.debug(action)
      return Object.assign({}, state, {
        type: action.type,
        content: action.content.content
      });

    case 'ABOUT_DIALOG':
      logger.debug(action)
      return Object.assign({}, state, {
        type: action.type,
        title: action.content.title,
        message: action.content.message,
      });

    case 'SHARING_DIALOG':
      logger.debug(action)
      return Object.assign({}, state, {
        type: action.type,
        weChat: action.content.weChat,
        circle: action.content.circle,
      });

    case 'PASSWORDRESET_DIALOG':
      logger.debug(action)
      // TODO: what front end should do when password resetting is successful      
      return Object.assign({}, state, {
        type: action.type,
        message: action.content.message,
      });

    case 'HALFEDITTOBACK_DIALOG':
      logger.debug(action)
      // TODO: what front end should do when password resetting is successful      
      return Object.assign({}, state, {
        type: action.type,
        message: action.content.message,
      });

      case 'EDITTOSUBMIT_DIALOG':
      logger.debug(action)
      // TODO: what front end should do when password resetting is successful      
      return Object.assign({}, state, {
        type: action.type,
      });

      case 'HALFEDITTOSUBMIT_DIALOG':
       logger.debug(action)
      // TODO: what front end should do when password resetting is successful      
      return Object.assign({}, state, {
        type: action.type,
      });

      case 'ISSUREMODIFY_DIALOG':
      logger.debug(action)
      // TODO: what front end should do when password resetting is successful      
      return Object.assign({}, state, {
        type: action.type,
        _id : action.content._id
      });

      case 'SUBLET_DIALOG':
      logger.debug(action)
      // TODO: what front end should do when password resetting is successful      
      return Object.assign({}, state, {
        type: action.type,
      });

    case 'CANCLE_DIALOG':
      logger.debug(action)
      // TODO: what front end should do when password resetting is successful      
      return Object.assign({}, state, {
        type: action.type,
      });



    default:
      return state;
  }
}
