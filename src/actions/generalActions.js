export function addRedirect(redirectTo){
  return {
    type: 'LOGIN_REDIRECT',
    payload: redirectTo
  }
}