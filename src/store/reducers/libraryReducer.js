import {LIBRARY_ACTIONS } from '../actionTypes';

const libraryReducer = (state, action) => {
  let newLibraryList = []; 
  switch (action.type) {
      case (LIBRARY_ACTIONS.addLibrary):
        newLibraryList = action.payload.fetchData;
        return { ...state, libraryList: newLibraryList };
      
      default: 
        return {...state}
  }
}

export default libraryReducer;