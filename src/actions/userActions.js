export function saveUser(user){
  return {
    type: 'SAVE_USER',
    payload: user
  }
}

export function updateUser(user){
  return {
    type: 'UPDATE_USER',
    payload: user
  }
}

export function doLogout(){
  return {
    type: 'USER_LOGOUT'
  }
}