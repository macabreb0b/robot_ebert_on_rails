import { combineReducers } from 'redux';

import movies from './movies_reducer';
import boxOfficeDays from './box_office_days_reducer';
import ui from './ui_reducer'

const rootReducer = combineReducers({
  movies, 
  boxOfficeDays,
  ui
});

export default rootReducer;