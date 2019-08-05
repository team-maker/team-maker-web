const initialState = {
  player: undefined
}

const playerReducer = (state = initialState, action) => {
  switch(action.type){
    case 'SAVE_PLAYER':
      return {
        ...state,
        player: action.payload.player
      }
    case 'SAVE_TEAM_PLAYERS':
      return {
        ...state,
        teamPlayers: action.payload
      }
    default:
      return state;
  }
}
export default playerReducer;