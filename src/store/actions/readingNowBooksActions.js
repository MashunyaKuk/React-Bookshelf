import { READING_BOOK_ACTIONS } from '../actionTypes';

export const readingBookAdd = (bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId) => {
  return ( {
    type: READING_BOOK_ACTIONS.addBook,
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

export const readingBookRemove = (bookId) => {
  return ( {
    type: READING_BOOK_ACTIONS.removeBook,
    payload: {
      bookId
    }
  })
};

export const readingBookRemoveAll = () => {
  return ( {
    type: READING_BOOK_ACTIONS.removeAllBooks,
    payload: {
    }
  })
};
