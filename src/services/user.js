import axios from './interceptor';

export const UserService = {

  doLogin(payload) {
    const url ='/api/login';
    return axios({
      method: 'post',
      url: url, 
      data: payload
    });
  },

  doFacebookLogin(payload) {
    const url ='/api/facebook-login';
    return axios({
      method: 'put',
      url: url, 
      data: payload
    });
  },

  doGetUser() {
    const url ='/api/users';
    return axios({
      method: 'get',
      url: url
    });
  },

  updatePassword(payload) {
    const url = '/api/users/update_password'
    return axios({
      method: 'put',
      url: url,
      data: payload
    })
  },

  requestPasswordRecovery(payload){
    const url = `/api/auth/password/reset/`
    return axios({
      method: 'get',
      url: url,
      params: {
        email : payload.email
      } 
    })
  },

  finishPasswordRecovery(payload){
    const url = `/api/users/passwords`    
    return axios({
      method: 'put',
      url: url,
      data: {
        user: {
          password: payload.password,
          password_confirmation: payload.passwordConfirmation
        },
        reset_token: payload.resetToken
      }
    })
  }
};