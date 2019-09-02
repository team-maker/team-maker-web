import axios from './interceptor';

export const RulesService = {

  doGetTeamRules(teamId) {
    const url = `/api/teams/${teamId}/rules`;
    return axios({
      method: 'get',
      url: url
    });
  }
  
};
