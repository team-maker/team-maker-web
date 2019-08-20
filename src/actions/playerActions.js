export function savePlayerTeams(teams){
  return {
    type: 'SAVE_PLAYER_TEAMS',
    payload: teams
  }
}
export function savePlayer(player){
  return {
    type: 'SAVE_PLAYER',
    payload: player
  }
}
