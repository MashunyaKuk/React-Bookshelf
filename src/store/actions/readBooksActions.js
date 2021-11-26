import { READ_BOOK_ACTIONS } from '../actionTypes';

export const readBookAdd = (bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId) => {
  return ( {
    type: READ_BOOK_ACTIONS.addBook,
    payload: {
      bookId,
      bookTitle,
      bookAuthors,
      bookCover,
      bookFirstYear,
      userId
    }
  })
};

export const readBookRemove = (bookId) => {
  return ( {
    type: READ_BOOK_ACTIONS.removeBook,
    payload: {
      bookId
    }
  })
};

export const readBookRemoveAll = () => {
  return ( {
    type: READ_BOOK_ACTIONS.removeAllBooks,
    payload: {
    }
  })
};
