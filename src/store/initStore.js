import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import rootReducer from './reducers/rootReducer';


const newUser = {};

const initialState = {
  userReducer: {user: newUser},
};



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
