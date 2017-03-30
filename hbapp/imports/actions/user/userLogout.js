import {Meteor} from 'meteor/meteor';
import { browserHistory } from 'react-router';


/**
 * @description User Logout
 * @export  
 * @param  
 * @returns 
 */
export function userLogout() {
  return (dispatch) => {

    Meteor.logout((err) =>{
      if(err){
        // TODO: something wrong.. 
      } else {
        browserHistory.push('/');
      }
    });
  }
}