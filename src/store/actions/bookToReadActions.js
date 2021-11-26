import { BOOK_TO_READ_ACTIONS } from '../actionTypes';

export const bookToReadAdd = (bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId) => {
  return ( {
    type: BOOK_TO_READ_ACTIONS.addBook,
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

export const bookToReadRemove = (bookId) => {
  return ( {
    type: BOOK_TO_READ_ACTIONS.removeBook,
    payload: {
      bookId
    }
  })
};

export const booksToReadRemoveAll = () => {
  return ( {
    type: BOOK_TO_READ_ACTIONS.removeAllBooks,
    payload: {
    }
  })
};
