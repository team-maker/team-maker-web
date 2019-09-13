export function saveCurrentGame(game){
  return {
    type: 'SAVE_CURRENT_GAME',
    payload: game
  }
}

