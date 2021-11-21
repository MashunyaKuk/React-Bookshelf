import { BOOK_TO_READ_ACTIONS } from '../actionTypes';

export const bookToReadAdd = (bookId, bookTitle, bookAuthors, bookCover, bookFirstYear) => {
  return ( {
    type: BOOK_TO_READ_ACTIONS.addBook,
    payload: {
      bookId,
      bookTitle,
      bookAuthors,
      bookCover,
      bookFirstYear
    }
  })
};

export const bookToReadRemove = (bookId) => {
  return ( {
    type: BOOK_TO_READ_ACTIONS.removeBook,
    payload: {
      bookId
    }
  })
};
