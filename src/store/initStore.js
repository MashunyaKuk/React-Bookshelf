import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import USER_LIST_ACTIONS from './actionTypes';


const newUserList = [];

const initialState = {userlist: newUserList};

const rootReducer = (state, action) => {
  let newUserList = []; 
  switch (action.type) {
      case (USER_LIST_ACTIONS.addUser):
        newUserList = [...state.userList];
        newUserList.push(
          {
            email: action.payload.email,
            password: action.payload.password,
            name: action.payload.name,
          }
        );
        return { ...state, userList: newUserList };

      default: 
        return {...state}
  }
}

const middlewares = [];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

