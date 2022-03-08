import { USER_ACTIONS } from '../actionTypes';

export const newUserAdd = (userName, userSurname, userEmail, userPassword, userId, userLoggedIn) => {
  return ( {
    type: USER_ACTIONS.addUser,
    payload: {
      name: userName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
      id: userId,
      loggedIn: userLoggedIn
  },
  
  })
};

export const logOutUser = () => {
  return ({
    type: USER_ACTIONS.logOut,
    payload: {
  }
})
};

export const logInUser = (userName, userSurname, userEmail, userPassword, userId, userLoggedIn) => {
  return ({
    type: USER_ACTIONS.logIn,
    payload: {
      name: userName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
      id: userId,
      loggedIn: userLoggedIn
  }
})
};

export const changeUserData = (userName, userSurname, userEmail, userPassword, userId, userLoggedIn) => {
  return ({
    type: USER_ACTIONS.changeUserData,
    payload: {
      name: userName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
      id: userId,
      loggedIn: userLoggedIn
  }
})
};

