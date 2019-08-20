import axios from './interceptor';

export const PlayerService = {

  doGetPlayer() {
    const url ='/api/players';
    return axios({
      method: 'get',
      url: url
    });
  },

  doGetPlayerTeams(playerId) {
    const url = `/api/players/${playerId}/teams`;
    return axios({
      method: 'get',
      url: url
    });
  },

  doPlayerUpdate(playerId, payload) {
    const url =`/api/players/${playerId}`;
    return axios({
      method: 'put',
      url: url,
      data: payload
    });
  },

  doJoinTeam(payload) {
    const url ='/api/team-players';
    return axios({
      method: 'post',
      url: url,
      data: payload
    });
  }
};
