import { combineReducers } from 'redux';
import userReducer from './userReducer';
import libraryReducer from './libraryReducer';
import booksToReadReducer from './booksToReadReducer';
import readingNowBooksReducer from './readingNowBooksReducer';
import readBooksReducer from './readBooksReducer';

const rootReducer = combineReducers({
    userReducer,
    libraryReducer,
    booksToReadReducer,
    readingNowBooksReducer,
    readBooksReducer,
})

export default rootReducer;