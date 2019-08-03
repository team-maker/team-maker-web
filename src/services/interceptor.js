import axios from 'axios';
import { AuthenticationService } from './authentication'

axios.defaults.timeout = 20000;
axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  config.headers['Accept'] = 'application/json'
  const token = localStorage.getItem('jwtToken');

  if(token){
    config.headers['Authorization'] = 'Bearer ' + token
  }

  return config;
});

axios.interceptors.response.use(
  (data) => {
    return Promise.resolve(data);
  },
  (error) => {
    const errorCode = error.response.status;
    if (errorCode === 401 && localStorage.getItem('jwtToken')) {
      AuthenticationService.logout()
      window.location.replace("/login");
      return Promise.reject(error);
    }
    return Promise.reject(error);
});

export default axios;