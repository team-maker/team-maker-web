import { combineReducers } from 'redux';
import userReducer from './userReducer';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';
import generalReducer from './generalReducer';

const appReducer = combineReducers({
  userReducer,
  playerReducer,
  gameReducer,
  generalReducer
});

export default appReducer;