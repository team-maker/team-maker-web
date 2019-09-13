const initialState = {
  currentGame: undefined,
}

const gameReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SAVE_CURRENT_GAME':
      return {
        currentGame: action.payload
      }
    default:
      return state;
  }
}
export default gameReducer;