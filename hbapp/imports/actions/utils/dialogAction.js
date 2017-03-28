export function simpleDialogAction(content) {
  return {
    type: 'SIMPLE_DIALOG',
    content
  };
}

export function aboutDialogAction(content) {
  return {
    type: "ABOUT_DIALOG",
    content
  };
}

export function sharingDialogAction(content) {
  return {
    type: "SHARING_DIALOG",
    content
  };
}

export function passwordResetDialogAction(content) {
  return {
    type: "PASSWORDRESET_DIALOG",
    content
  };
}

export function halfEditToBackDialogAction(content) {
  return {
    type: "HALFEDITTOBACK_DIALOG",
    content
  };
}

export function editToSubmitDialogAction() {
  return {
    type: "EDITTOSUBMIT_DIALOG",
  };
}

export function halfEditToSubmitDialogAction() {
  return {
    type: "HALFEDITTOSUBMIT_DIALOG",
  };
}

export function isSureModifyDialogAction(content){
  return{
    type: "ISSUREMODIFY_DIALOG",
    content
  }
}

export function modifyBackToDialogAction(){
  return{
    type: "MODIFYBACK_DIALOG",
  }
}

export function submitSubletDialogAction(){
  return{
    type:"SUBLET_DIALOG",
  }
}



export function cancleSubletDialogAction(){
  return{
    type:"CANCLE_DIALOG",
  }
}