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

  doCreateGame(teamId, payload) {
    const url = `/api/teams/${teamId}/games`;
    return axios({
      method: 'post',
      url: url,
      data: payload
    });
  },

  doMarkGameFinished(teamId, gameId) {
    const url = `/api/teams/${teamId}/games/${gameId}/finish`;
    return axios({
      method: 'put',
      url: url
    });
  },

  doGetGamePoints(teamId, gameId) {
    const url = `/api/teams/${teamId}/games/${gameId}/points`;
    return axios({
      method: 'get',
      url: url
    });
  },

  doGetGameGoals(teamId, gameId) {
    const url = `/api/teams/${teamId}/games/${gameId}/goals`;
    return axios({
      method: 'get',
      url: url
    });
  },
  
};
