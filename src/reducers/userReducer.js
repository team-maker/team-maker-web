const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {} ,// {login: null, client: {slug: null}, avatar: {thumb: { url: ''} } },
  jwtToken: localStorage.getItem('jwtToken') || null,
}

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload.user,
        jwtToken: action.payload.token
      }
    default:
      return state;
  }
}
export default userReducer;