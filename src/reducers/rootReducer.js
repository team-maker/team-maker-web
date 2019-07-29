import appReducer from './appReducer';
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    console.log("HEY");
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer;