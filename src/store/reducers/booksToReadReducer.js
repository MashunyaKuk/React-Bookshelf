import { BOOK_TO_READ_ACTIONS } from '../actionTypes';

const booksToReadReducer = (state, action) => {
  let newBooksList = []; 
  switch (action.type) {
      case (BOOK_TO_READ_ACTIONS.addBook):
        newBooksList = [...state.booksList];
        newBooksList.push({
          bookId: action.payload.bookId,
          bookTitle: action.payload.bookTitle,
          bookAuthors: action.payload.bookAuthors,
          bookCover: action.payload.bookCover,
          bookFirstYear: action.payload.bookFirstYear,
          userId: action.payload.userId
        })
        return { ...state, booksList: newBooksList };

        case (BOOK_TO_READ_ACTIONS.removeBook):
          newBooksList = [...state.booksList];
          const bookToRemove = newBooksList.findIndex(book => book.bookId === action.payload.bookId)
          newBooksList.splice(bookToRemove, 1)
          return { ...state, booksList: newBooksList };

          case (BOOK_TO_READ_ACTIONS.removeAllBooks):
            newBooksList = [];
            return { ...state, booksList: newBooksList };
      
          
      default: 
        return {...state}
  }
}

export default booksToReadReducer;