import axios from './interceptor';

export const TeamGroupPlayerService = {

  doGetTeamGroupPlayers(teamId, gameId) {
    const url =`/api/teams/${teamId}/games/${gameId}/group-players`;
    return axios({
      method: 'get',
      url: url
    });
  },
};
