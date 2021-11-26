
export const readBooksAdd = (bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId) => {
  return new Promise((res, rej) => {

    let readBooksList = JSON.parse(window.localStorage.getItem('readBooksList'));
    if (!readBooksList) readBooksList = [] ;

    const dataReadBook = { bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId };
    readBooksList.push(dataReadBook);
    window.localStorage.setItem('readBooksList', JSON.stringify(readBooksList));

    res({ dataReadBook });
  }
)}

export const readBooksRemove = (currentBookId) => {
  return new Promise((res, rej) => {

    let readBooksList = JSON.parse(window.localStorage.getItem('readBooksList'));
    if (!readBooksList) rej();

    const bookReadRemove = readBooksList.findIndex(book => book.bookId === currentBookId);
    if (bookReadRemove !== -1) {
      readBooksList.splice(bookReadRemove, 1);
    } else {
      rej();
    }
    
    window.localStorage.setItem('readBooksList', JSON.stringify(readBooksList));

    res();
  }
)}


export const readBooks = (currentUserId) => {
  return new Promise((res, rej) => {
    let readBooksList = JSON.parse(window.localStorage.getItem('readBooksList'));
    if (!readBooksList) rej();

    const currentUsersReadBooks = readBooksList.filter((book) => {
      if (book.userId === currentUserId) {
        return book
      }
      
    });

    res(currentUsersReadBooks);
  }
)}


