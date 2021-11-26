import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';


const newUser = {};
const newLibraryList = [];
const newBooksList = [];
const newReadingBooksList = [];
const newReadBooksList = [];

const initialState = {
  userReducer: {user: newUser},
  libraryReducer: {libraryList: newLibraryList},
  booksToReadReducer: {booksList: newBooksList},
  readingNowBooksReducer: {readingBooksList: newReadingBooksList},
  readBooksReducer: {readBooksList: newReadBooksList}
};

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

export const store = createStore(
  persistedReducer,
  initialState,
  composedEnhancers,
);

export const persistor = persistStore(store);
