export const AuthenticationService = {
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  },

  login(user, token) {
    localStorage.setItem('user', user);
    localStorage.setItem('jwtToken', token);
  }
}