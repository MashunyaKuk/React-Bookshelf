import { USER_THEME } from '../actionTypes';

const userThemeReducer = (state, action) => {
  let newUserTheme = {}; 
  switch (action.type) {
      case (USER_THEME.addTheme):
        newUserTheme =
         {  theme: action.payload.theme
          };
        return { ...state, userTheme: newUserTheme };
      
      default: 
        return {...state}
  }
}

export default userThemeReducer;