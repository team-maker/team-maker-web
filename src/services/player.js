import axios from './interceptor';

export const PlayerService = {

  doGetTeamPlayers() {
    const url ='/api/team-players';
    return axios({
      method: 'get',
      url: url
    });
  },

  doPlayerUpdate(payload) {
    const url ='/api/players';
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
