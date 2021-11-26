import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import bookCover from '../../assets/img/bookcover.jpg';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bookToReadRemove } from '../../store/actions/bookToReadActions';
import { booksToRead, booksToReadRemove } from '../../api/booksToReadInstance';
import { useHistory } from 'react-router-dom';
import { PATHS } from '../../Root/routes';
import { readingNowBooksAdd, readingNowBooksRemove } from '../../api/readingNowBooksInstance';
import { readingBookAdd } from '../../store/actions/readingNowBooksActions';
import { readBooksAdd } from '../../api/readBooksInstance';
import { readBookAdd } from '../../store/actions/readBooksActions';

const StyledWantToReadScene = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: center;
flex-wrap: wrap;
  
.bookcard-cover {
  margin-bottom: 5px;
  background-image: url(${bookCover});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  border-radius: 4px;
  margin-right: 20px;
}

.want-library-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 30px 30px;
  max-width: 650px;
  border: 1px solid #212121;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: #c8956621;
}

  .bookcard-cover_img {
    width: 120px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }

  .bookcard-author {
    overflow: hidden;
    max-height: 80px;
  }

  .bookcard-text {
    width: 300px;
    margin-right: 20px;
  }

  .bookcard-name, .bookcard-author_p {
    font-size: 16px;
    margin: 0 0 15px 0;
    text-align: center;
  }

  .bookcard-pages {
    font-size: 14px;
    text-align: center;
  }

  .bookcard-btn-group {
    display: flex;
    flex-direction: column;
  }

  .reading-book_btn, .read-book_btn, .remove-book_btn  {
    color: #F6F5F3;
    font-family: 'Montserrat';
    padding: 10px 20px;
    cursor: pointer;
    background-color: #6E7064;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    margin-bottom: 15px;
  }

  .read-book_btn {
    background-color: #C89566;
  }

  .remove-book_btn {
    margin-bottom: 0;
    background-color: #925039;
  }

  .bookcard-none_p {
    font-size: 18px;
    margin: 20px 0 0 20px;
  }
`;

const WantToReadScene = () => {
  const params = useParams();
  const urlParams = Number(params.userId);
  const [books, setBooks] = useState([]);
  const history = useHistory();

  //достаю данные из localstorage, но он очищается только после обновления страницы браузера!
  useEffect(() => {
    booksToRead(urlParams)
      .then((currentUsersBooks) => {
        setBooks(currentUsersBooks);
      })
      .catch(() => {
      }

      )
  }, []);

  const dispatch = useDispatch();
  return (
    <StyledWantToReadScene>
      {books.length !== 0
        ?
        books.map((book) => {
          return (
            <React.Fragment key={book.bookId}>
              <div className="want-library-container">
                <div className="bookcard-cover" >
                  <img src={`https://covers.openlibrary.org/b/isbn/${book.bookCover}-L.jpg`} alt="" className="bookcard-cover_img" />
                </div>
                <div className="bookcard-text">
                  <h4 className="bookcard-name">{book.bookTitle}</h4>
                  <div className="bookcard-author">
                    <p className="bookcard-author_p">
                      {book.bookAuthors}
                    </p>
                  </div>
                  <div className="bookcard-pages">
                    <p className="bookcard-pages">
                      First published year - {book.bookFirstYear}
                    </p>
                  </div>
                </div>
                <div className="bookcard-btn-group">
                  <button
                    type="button"
                    className="reading-book_btn"
                    onClick={() => {
                      readingNowBooksAdd(book.bookId, book.bookTitle, book.bookAuthors, book.bookCover, book.bookFirstYear, book.userId)
                        .then(({ dataReadingBook }) => {
                          console.log('data', dataReadingBook)
                          dispatch(readingBookAdd(dataReadingBook.bookId, dataReadingBook.bookTitle, dataReadingBook.bookAuthors, dataReadingBook.bookCover, dataReadingBook.bookFirstYear, dataReadingBook.dataBookId));

                        })
                      booksToReadRemove(book.bookId)
                        .then(() => {
                          dispatch(bookToReadRemove(book.bookId));
                          history.push(PATHS.PROFILE_READING(book.userId));
                        }
                        )
                    }}>
                    Reading now
                  </button>
                  <button
                    type="button"
                    className="read-book_btn"
                    onClick={() => {
                      readBooksAdd(book.bookId, book.bookTitle, book.bookAuthors, book.bookCover, book.bookFirstYear, book.userId)
                        .then(({ dataReadBook }) => {
                          console.log('data', dataReadBook)
                          dispatch(readBookAdd(dataReadBook.bookId, dataReadBook.bookTitle, dataReadBook.bookAuthors, dataReadBook.bookCover, dataReadBook.bookFirstYear, dataReadBook.dataBookId));

                        })
                      booksToReadRemove(book.bookId)
                        .then(() => {
                          dispatch(bookToReadRemove(book.bookId));
                          history.push(PATHS.PROFILE_FINISHED(book.userId));
                        }
                        )
                    }}>
                    Already read book
                  </button>
                  <button
                    type="button"
                    className="remove-book_btn"
                    onClick={() => {
                      booksToReadRemove(book.bookId)
                        .then(() => {
                          dispatch(bookToReadRemove(book.bookId));
                          history.push(PATHS.PROFILE_ABOUT(book.userId));
                        })
                    }}>
                    Remove book
                  </button>
                </div>

              </div>
            </React.Fragment>
          )
        }
        )
        :
        <div className="bookcard-none">
          <p className="bookcard-none_p">
            HERE will be your own want to read book list
          </p>
        </div>}
    </StyledWantToReadScene>
  );
};

export default WantToReadScene;
