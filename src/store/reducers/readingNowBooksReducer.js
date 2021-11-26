import { READING_BOOK_ACTIONS } from '../actionTypes';

const readingNowBooks = (state, action) => {
  let newReadingBooksList = []; 
  switch (action.type) {
      case (READING_BOOK_ACTIONS.addBook):
        newReadingBooksList = [...state.readingBooksList];
        newReadingBooksList.push({
          bookId: action.payload.bookId,
          bookTitle: action.payload.bookTitle,
          bookAuthors: action.payload.bookAuthors,
          bookCover: action.payload.bookCover,
          bookFirstYear: action.payload.bookFirstYear,
          userId: action.payload.userId
        })
        return { ...state, readingBooksList: newReadingBooksList };

        case (READING_BOOK_ACTIONS.removeBook):
          newReadingBooksList = [...state.readingBooksList];
          const bookToRemove = newReadingBooksList.findIndex(book => book.bookId === action.payload.bookId)
          newReadingBooksList.splice(bookToRemove, 1)
          return { ...state, readingBooksList: newReadingBooksList };

          case (READING_BOOK_ACTIONS.removeAllBooks):
          newReadingBooksList = [];
            return { ...state, readingBooksList: newReadingBooksList };
      
          
      default: 
        return {...state}
  }
}

export default readingNowBooks;