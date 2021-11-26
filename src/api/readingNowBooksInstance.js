
export const readingNowBooksAdd = (bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId) => {
  return new Promise((res, rej) => {

    let readingNowBooksList = JSON.parse(window.localStorage.getItem('readingNowBooksList'));
    if (!readingNowBooksList) readingNowBooksList = [] ;

    const dataReadingBook = { bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId };
    readingNowBooksList.push(dataReadingBook);
    window.localStorage.setItem('readingNowBooksList', JSON.stringify(readingNowBooksList));

    res({ dataReadingBook });
  }
)}

export const readingNowBooksRemove = (currentBookId) => {
  return new Promise((res, rej) => {

    let readingNowBooksList = JSON.parse(window.localStorage.getItem('readingNowBooksList'));
    if (!readingNowBooksList) rej();

    const bookReadingRemove = readingNowBooksList.findIndex(book => book.bookId === currentBookId);
    if (bookReadingRemove !== -1) {
      readingNowBooksList.splice(bookReadingRemove, 1);
    } else {
      rej();
    }
    
    window.localStorage.setItem('readingNowBooksList', JSON.stringify(readingNowBooksList));

    res();
  }
)}


export const readingNowBooks = (currentUserId) => {
  return new Promise((res, rej) => {
    let readingNowBooksList = JSON.parse(window.localStorage.getItem('readingNowBooksList'));
    if (!readingNowBooksList) rej();

    const currentUsersReadingBooks = readingNowBooksList.filter((book) => {
      if (book.userId === currentUserId) {
        return book
      }
      
    });

    res(currentUsersReadingBooks);
  }
)}


