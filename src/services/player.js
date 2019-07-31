import axios from './interceptor';

export const PlayerService = {

  doGetPlayer() {
    const url ='/api/players';
    return axios({
      method: 'get',
      url: url
    });
  }
};
