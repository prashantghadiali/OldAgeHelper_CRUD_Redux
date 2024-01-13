import { combineReducers } from 'redux';
import reminderReducer from './reminders';

const rootReducer = combineReducers({
  reminders: reminderReducer,
});

export default rootReducer;