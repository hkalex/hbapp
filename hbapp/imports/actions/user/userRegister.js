import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';
import Chance from 'chance';

import {simpleSnackbarAction} from '../utils/snackbarAction';

/**
 * @description Create a new user.
 * @export Adding new User 
 * @param {username, phoneNum, password} payload contains {username, phoneNum, password}
 * @returns Meteor methods addUser.
 */
export function userRegister(payload) {
  return (dispatch) => {
    
    const chance = new Chance();
    var userInfo = payload;
    if(userInfo.username ===''){
      userInfo.username = chance.hash();
    }
    Accounts.createUser(userInfo, (err) => {
      if(err){
        // TODO: need to change this to user dialog instead.
        dispatch(simpleSnackbarAction({
          message: err.reason
        }));
      } else {
        browserHistory.push('/home');
        // Do something (When it Success)
      }
    });
  };
}
