import {Meteor} from 'meteor/meteor';

export function setFavoriteAction(projectId) {
  return (dispatch) => {

    Meteor.call('setProjectFavorite', projectId, (err,result) => {
      if(err){
        // TODO: dispatch user or password error (userNotFound)
        // dispatch(simpleSnackbarAction({
        //   message: '您的 用户名/手机号 或 密码 有误, 请重新输入'
        // }));
      } 
      if(result) {
      //   Meteor.loginWithPassword({id: result}, payload.password, (err)=>{
      //     if(err){
      //       dispatch(simpleSnackbarAction({
      //         message: '您的 用户名/手机号 或 密码 有误, 请重新输入'
      //       }));
      //     } else {
      //       browserHistory.push('/home');
      //       // TODO: jump to home ?
      //     }
      //  });
      } 
    });
  };
}
