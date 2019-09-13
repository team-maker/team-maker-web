const initialState = {
  loading: 0,
  redirectTo: null
}

const generalReducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOADING_TRUE':
      return {
        loading: state.loading + 1
      }
    case 'LOADING_FALSE':
      return {
        loading: state.loading > 0 ? state.loading - 1 : 0
      }
    case 'LOADING_RESET':
      return {
        loading: 0
      }
    case 'LOGIN_REDIRECT':
      return {
        redirectTo: action.payload
      }
    default:
      return state;
  }
}
export default generalReducer;