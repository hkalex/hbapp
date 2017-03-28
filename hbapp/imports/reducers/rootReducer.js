import { combineReducers } from 'redux';
import dialog from './utils/dialog';
import testDialog from './utils/testDialog';
import snackbar from './utils/snackbar';
import projectList from './project/projectList';
import offPlanList from './project/offPlanList';
import myFolderList from './myFolder/myFolderList';
import lists from './utils/lists';
import langs from './utils/langs';
import infoList from './discover/infoList';
import activityList from './discover/activityList';

import subletForm from './sublet/subletForm';
import subletList from './sublet/subletList';

const rootReducer = combineReducers({
  dialog,
  testDialog,
  snackbar,
  projectList,
  offPlanList,
  myFolderList,
  lists,
  langs,
  infoList,
  activityList,
  subletForm,
  subletList
});

export default rootReducer;
