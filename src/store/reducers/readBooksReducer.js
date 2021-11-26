import { READ_BOOK_ACTIONS } from '../actionTypes';

const readBooks = (state, action) => {
  let newReadBooksList = []; 
  switch (action.type) {
      case (READ_BOOK_ACTIONS.addBook):
        newReadBooksList = [...state.readBooksList];
        newReadBooksList.push({
          bookId: action.payload.bookId,
          bookTitle: action.payload.bookTitle,
          bookAuthors: action.payload.bookAuthors,
          bookCover: action.payload.bookCover,
          bookFirstYear: action.payload.bookFirstYear,
          userId: action.payload.userId
        })
        return { ...state, readBooksList: newReadBooksList };

        case (READ_BOOK_ACTIONS.removeBook):
          newReadBooksList = [...state.readBooksList];
          const bookToRemove = newReadBooksList.findIndex(book => book.bookId === action.payload.bookId)
          newReadBooksList.splice(bookToRemove, 1)
          return { ...state, readBooksList: newReadBooksList };

          case (READ_BOOK_ACTIONS.removeAllBooks):
            newReadBooksList = [];
            return { ...state, readBooksList: newReadBooksList };
      
          
      default: 
        return {...state}
  }
}

export default readBooks;