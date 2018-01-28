import { combineReducers } from 'redux';

import movies from './movies_reducer';
import boxOfficeDays from './box_office_days_reducer';
import ui from './ui_reducer';
import session from './sessions_reducer';
import errors from './errors_reducer';

const rootReducer = combineReducers({
  boxOfficeDays,
  errors,
  movies,
  session,
  ui
});

export default rootReducer;