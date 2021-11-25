import { USER_ACTIONS } from '../actionTypes';

const userReducer = (state, action) => {
  let newUser = {}; 
  switch (action.type) {
      case (USER_ACTIONS.addUser):
        newUser =
         {  name: action.payload.name,
            surname: action.payload.surname,
            email: action.payload.email,
            password: action.payload.password,
            id: action.payload.id,
            loggedIn: action.payload.loggedIn,
          };
        return { ...state, user: newUser };
      case (USER_ACTIONS.logOut):
        newUser = {}; 
        return {...state, user: newUser};

      case (USER_ACTIONS.logIn):
        newUser =
          { name: action.payload.name,
            surname: action.payload.surname,
            email: action.payload.email,
            password: action.payload.password,
            id: action.payload.id,
            loggedIn: action.payload.loggedIn
          };
        return { ...state, user: newUser };
      
      default: 
        return {...state}
  }
}

export default userReducer;