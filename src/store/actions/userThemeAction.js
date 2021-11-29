import { USER_THEME } from '../actionTypes';

export const userTheme = (userTheme) => {
  return ( {
    type: USER_THEME.addTheme,
    payload: {
      theme: userTheme
  },
  
  })
};