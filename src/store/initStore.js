import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import USER_ACTIONS from './actionTypes';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';


const newUser = [];

const initialState = {user: newUser};

const rootReducer = (state, action) => {
  let newUser = []; 
  switch (action.type) {
      case (USER_ACTIONS.addUser):
        //newUser = [...state.user];
        newUser.push(
          {
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
            id: action.payload.id,
            loggedIn: action.payload.loggedIn,
          }
        );
        return { ...state, user: newUser };
      case (USER_ACTIONS.logOut):
        return { ...initialState };

      case (USER_ACTIONS.logIn):
        //newUser = [...state.user];
        newUser.push(
          {
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password,
            id: action.payload.id,
            loggedIn: action.payload.loggedIn,
          }
        );
        return { ...state, user: newUser };
      
      default: 
        return {...state}
  }
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

export const store = createStore(
  persistedReducer,
  initialState,
  composedEnhancers,
);

export const persistor = persistStore(store);
