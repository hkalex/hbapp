import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

import logger from '/imports/loggers/logger';

// actions
import { simpleSnackbarAction } from '../utils/snackbarAction';

/**
 * @description User Login
 * @export  
 * @param {login(phoneNum or username), password} 
 * @returns 
 */
export function userLogin(payload) {
  return (dispatch) => {

    Meteor.call('getUserIdForLogin', payload, (err, result) => {
      if (err) {
        // TODO: dispatch user or password error (userNotFound)
        dispatch(simpleSnackbarAction({
          message: '您的 用户名/手机号 或 密码 有误, 请重新输入'
        }));
      }
      if (result) {
        Meteor.loginWithPassword({ id: result }, payload.password, (err) => {
          if (err) {
            dispatch(simpleSnackbarAction({
              message: '您的 用户名/手机号 或 密码 有误, 请重新输入'
            }));
          } else {
            browserHistory.push('/home');
            // TODO: jump to home ?
            // add userId to logger collection
            logger.setUserId();
          }
        });
      }
    });

  };
}
