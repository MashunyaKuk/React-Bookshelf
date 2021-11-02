import USER_LIST_ACTIONS from '../actionTypes';

export const newUserAdd = (userName, userEmail, userPassword, userId) => {
  return ( {
    type: USER_LIST_ACTIONS.addUser,
    payload: {
      name: userName,
      email: userEmail,
      password: userPassword,
      id: userId,
  },
  
  })
};
