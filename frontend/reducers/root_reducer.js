import { combineReducers } from 'redux';

import movies from './movies_reducer';
import ui from './ui_reducer'

const rootReducer = combineReducers({
  movies, 
  ui
});

export default rootReducer;