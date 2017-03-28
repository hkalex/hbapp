import { combineReducers } from 'redux';
import dialog from './utils/dialog';
import snackbar from './utils/snackbar';

const rootReducer = combineReducers({
  dialog,
  snackbar,
});

export default rootReducer;
