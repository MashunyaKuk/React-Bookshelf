import { combineReducers } from 'redux';
import userReducer from './userReducer';
import libraryReducer from './libraryReducer';

const rootReducer = combineReducers({
    userReducer,
    libraryReducer
})

export default rootReducer;