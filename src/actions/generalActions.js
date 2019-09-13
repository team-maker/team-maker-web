export function addRedirect(redirectTo){
  return {
    type: 'LOGIN_REDIRECT',
    payload: redirectTo
  }
}

export function startFetch(){
  return {
    type: 'LOADING_TRUE',
  }
}

export function endFetch(){
  return {
    type: 'LOADING_FALSE',
  }
}

