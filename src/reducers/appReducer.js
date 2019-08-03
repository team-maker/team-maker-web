import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playerReducer';

const appReducer = combineReducers({
  userReducer,
  playerReducer
});

export default appReducer;