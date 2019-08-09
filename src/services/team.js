import axios from './interceptor';

export const TeamService = {

  doCreateTeam(payload) {
    const url ='/api/teams';
    return axios({
      method: 'post',
      url: url,
      data: payload
    });
  },

  doGetTeam(teamId) {
    const url = `/api/teams/${teamId}`;
    return axios({
      method: 'get',
      url: url
    });
  }
};
