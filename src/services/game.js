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

  doCreateGameGoal(teamId, gameId, payload) {
    const url = `/api/teams/${teamId}/games/${gameId}/goals`;
    return axios({
      method: 'post',
      url: url,
      data: payload
    });
  },


  doGetGameAvailablePlayers(teamId, gameId) {
    const url = `/api/teams/${teamId}/games/${gameId}/available-players`;
    return axios({
      method: 'get',
      url: url
    });
  },

  doUpdateAvailablePlayer(teamId, gameId, availablePlayerId, payload) {
    const url = `/api/teams/${teamId}/games/${gameId}/available-players/${availablePlayerId}`;
    return axios({
      method: 'put',
      url: url,
      data: payload
    });
  },

  doGenerateTeams(teamId, gameId) {
    const url = `/api/teams/${teamId}/games/${gameId}/generate_teams`;
    return axios({
      method: 'post',
      url: url
    });
  }
};
