
export const booksToReadAdd = (bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId) => {
  return new Promise((res, rej) => {

    let booksToReadList = JSON.parse(window.localStorage.getItem('booksToReadList'));
    if (!booksToReadList) booksToReadList = [] ;

    const dataBook = { bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId };
    booksToReadList.push(dataBook);
    window.localStorage.setItem('booksToReadList', JSON.stringify(booksToReadList));

    res({ dataBook });
  }
)}

export const booksToReadRemove = (currentBookId) => {
  return new Promise((res, rej) => {

    let booksToReadList = JSON.parse(window.localStorage.getItem('booksToReadList'));
    if (!booksToReadList) rej();

    const bookRemove = booksToReadList.findIndex(book => book.bookId === currentBookId);
    if (bookRemove !== -1) {
      booksToReadList.splice(bookRemove, 1);
    } else {
      rej();
    }
    
    window.localStorage.setItem('booksToReadList', JSON.stringify(booksToReadList));

    res();
  }
)}


export const booksToRead = (currentUserId) => {
  return new Promise((res, rej) => {
    let booksToReadList = JSON.parse(window.localStorage.getItem('booksToReadList'));
    if (!booksToReadList) rej();

    const currentUsersBooks = booksToReadList.filter((book) => {
      if (book.userId === currentUserId) {
        return book
      }
      
    });

    res(currentUsersBooks);
  }
)}


