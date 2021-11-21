import { combineReducers } from 'redux';
import userReducer from './userReducer';
import libraryReducer from './libraryReducer';
import booksToReadReducer from './booksToReadReducer';

const rootReducer = combineReducers({
    userReducer,
    libraryReducer,
    booksToReadReducer,
})

export default rootReducer;