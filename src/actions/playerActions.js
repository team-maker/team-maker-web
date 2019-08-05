export function saveTeamPlayers(teamPlayers){
  return {
    type: 'SAVE_TEAM_PLAYERS',
    payload: teamPlayers
  }
}
export function savePlayer(player){
  return {
    type: 'SAVE_PLAYER',
    payload: player
  }
}
