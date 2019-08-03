import axios from './interceptor';

export const PlayerService = {

  doGetPlayer() {
    const url ='/api/players';
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
  }
};
