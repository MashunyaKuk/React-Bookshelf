import { combineReducers } from 'redux';
import userReducer from './userReducer';
import libraryReducer from './libraryReducer';
import booksToReadReducer from './booksToReadReducer';
import readingNowBooksReducer from './readingNowBooksReducer';
import readBooksReducer from './readBooksReducer';
import userThemeReducer from './userThemeReducer';
import avatarReducer from './avatarReducer';

const rootReducer = combineReducers({
    userReducer,
    libraryReducer,
    booksToReadReducer,
    readingNowBooksReducer,
    readBooksReducer,
    userThemeReducer,
    avatarReducer,
})

export default rootReducer;