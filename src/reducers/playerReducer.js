const initialState = {
  player: undefined,
  teams: []
}

const playerReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SAVE_PLAYER':
      return {
        ...state,
        player: action.payload.player
      }
    case 'SAVE_PLAYER_TEAMS':
      return {
        ...state,
        teams: action.payload
      }
    default:
      return state;
  }
}
export default playerReducer;