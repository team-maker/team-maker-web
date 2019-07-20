export const AuthenticationService = {
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }
}