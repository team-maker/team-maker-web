import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playerReducer';
import generalReducer from './generalReducer';

const appReducer = combineReducers({
  userReducer,
  playerReducer,
  generalReducer
});

export default appReducer;