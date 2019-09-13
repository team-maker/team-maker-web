import axios from './interceptor';

export const TeamPlayerService = {

  doGetTeamPlayerStats(teamPlayerId) {
    const url =`/api/team-players/${teamPlayerId}/stats`;
    return axios({
      method: 'get',
      url: url
    });
  },
};
