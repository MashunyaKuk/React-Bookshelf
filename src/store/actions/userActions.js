import USER_ACTIONS from '../actionTypes';

export const newUserAdd = (userName, userEmail, userPassword, id, userLogged) => {
  return ( {
    type: USER_ACTIONS.addUser,
    payload: {
      name: userName,
      email: userEmail,
      password: userPassword,
      id,
      logged: userLogged,
  },
  
  })
};

export const logOutUser = () => {
  return ({
    type: USER_ACTIONS.logOut,
    payload: {
  }
})
}
