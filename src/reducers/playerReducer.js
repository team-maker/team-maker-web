const initialState = {
  player: {}
}

const playerReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SAVE_PLAYER':
      return {
        ...state,
        player: action.payload.player
      }
    default:
      return state;
  }
}
export default playerReducer;