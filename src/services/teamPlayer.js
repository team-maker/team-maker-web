import axios from './interceptor';

export const TeamPlayerService = {

  doGetTeamPlayerStats(teamId, teamPlayerId) {
    const url =`/api/teams/${teamId}/team-players/${teamPlayerId}/stats`;
    return axios({
      method: 'get',
      url: url
    });
  },
  doEvaluateTeamPlayer(teamId, teamPlayerId, payload) {
    const url =`/api/teams/${teamId}/team-players/${teamPlayerId}/evaluate`;
    console.log(url)
    return axios({
      method: 'put',
      url: url,
      data: payload
    });
  },
};
