
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

export const booksToReadRemove = (bookId) => {
  return new Promise((res, rej) => {

    let booksToReadList = JSON.parse(window.localStorage.getItem('booksToReadList'));
    if (!booksToReadList) rej();

    const dataBook = { bookId, bookTitle, bookAuthors, bookCover, bookFirstYear, userId };
    booksToReadList.push(dataBook);
    window.localStorage.setItem('booksToReadList', JSON.stringify(booksToReadList));

    res({ dataBook });
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


