import axios from './interceptor';

export const GameService = {

  doGetTeamGames(teamId) {
    const url = `/api/teams/${teamId}/games`;
    return axios({
      method: 'get',
      url: url
    });
  },

  doGetGame(teamId, gameId) {
    const url = `/api/teams/${teamId}/games/${gameId}`;
    return axios({
      method: 'get',
      url: url
    });
  },
};
