export function saveUser(user){
  return {
    type: 'SAVE_USER',
    payload: user
  }
}

export function doLogout(){
  return {
    type: 'USER_LOGOUT'
  }
}