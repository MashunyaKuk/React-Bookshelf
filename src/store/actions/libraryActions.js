import { LIBRARY_ACTIONS } from '../actionTypes';

export const newLibraryAdd = (fetchData) => {
  return ( {
    type: LIBRARY_ACTIONS.addLibrary,
    payload: {
      fetchData
    }
  })
};
