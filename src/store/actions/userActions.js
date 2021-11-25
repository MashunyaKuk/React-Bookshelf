import { USER_ACTIONS } from '../actionTypes';

export const newUserAdd = (userName, userEmail, userPassword, userId, userLoggedIn, booksToReadIds) => {
  return ( {
    type: USER_ACTIONS.addUser,
    payload: {
      name: userName,
      email: userEmail,
      password: userPassword,
      id: userId,
      loggedIn: userLoggedIn,
      booksToReadIds: booksToReadIds
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

export const logInUser = (userName, userEmail, userPassword, userId, userLoggedIn, booksToReadIds) => {
  return ({
    type: USER_ACTIONS.logIn,
    payload: {
      name: userName,
      email: userEmail,
      password: userPassword,
      id: userId,
      loggedIn: userLoggedIn,
      booksToReadIds: booksToReadIds
  }
})
};

