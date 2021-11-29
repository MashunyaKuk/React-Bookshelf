import React, { useEffect } from 'react';
import styled from 'styled-components';
import bookCover from '../../assets/img/bookcover.jpg';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookToReadRemove } from '../../store/actions/bookToReadActions';
import { booksToRead, booksToReadRemove } from '../../api/booksToReadInstance';
import { readingNowBooksAdd } from '../../api/readingNowBooksInstance';
import { readingBookAdd } from '../../store/actions/readingNowBooksActions';
import { readBooksAdd } from '../../api/readBooksInstance';
import { readBookAdd } from '../../store/actions/readBooksActions';
import { bookToReadAdd } from '../../store/actions/bookToReadActions';
import { booksToReadSelector } from '../../store/selectors/booksToReadSelector';
import LazyImage from '../../Components/LazyImage';

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
  @media (max-width: 1200px) {
    max-width: 550px;
  }
  @media (max-width: 992px) {
    max-width: 450px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
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
    display: flex;
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
    @media (max-width: 992px) {
      min-width: 120px;
  }
    min-width: 170px;
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
  const dispatch = useDispatch();

  const booksToReadList = useSelector(booksToReadSelector);

  useEffect(() => {
    let mounted = true; //переменная, отвечающая за то, чтобы не обновлять состояние, если компонент еще не смонтирован
    booksToRead(urlParams)
      .then((currentUsersBooks) => {
        if (mounted) {
          if (booksToReadList.length !== currentUsersBooks.length) {
            currentUsersBooks.map((book) => {
              dispatch(bookToReadAdd(book.bookId, book.bookTitle, book.bookAuthors, book.bookCover, book.bookFirstYear, book.userId))
            })
          }
        }
      })
      .catch(() => {
      })
    return () => mounted = false;
  }, [])


  return (
    <StyledWantToReadScene>
      {booksToReadList.length !== 0
        ?
        booksToReadList.map((book) => {
          return (
            <React.Fragment key={book.bookId}>
              <div className="want-library-container">
                <div className="bookcard-cover" >
                  <LazyImage src={`https://covers.openlibrary.org/b/isbn/${book.bookCover}-L.jpg`} alt="" className="bookcard-cover_img" />
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
                          dispatch(readingBookAdd(dataReadingBook.bookId, dataReadingBook.bookTitle, dataReadingBook.bookAuthors, dataReadingBook.bookCover, dataReadingBook.bookFirstYear, dataReadingBook.userId));
                        })
                      booksToReadRemove(book.bookId)
                        .then(() => {
                          dispatch(bookToReadRemove(book.bookId));
                        })
                    }}>
                    Reading now
                  </button>
                  <button
                    type="button"
                    className="read-book_btn"
                    onClick={() => {
                      readBooksAdd(book.bookId, book.bookTitle, book.bookAuthors, book.bookCover, book.bookFirstYear, book.userId)
                        .then(({ dataReadBook }) => {
                          dispatch(readBookAdd(dataReadBook.bookId, dataReadBook.bookTitle, dataReadBook.bookAuthors, dataReadBook.bookCover, dataReadBook.bookFirstYear, dataReadBook.userId));
                        })
                      booksToReadRemove(book.bookId)
                        .then(() => {
                          dispatch(bookToReadRemove(book.bookId));
                        })
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
                        })
                    }}>
                    Remove book
                  </button>
                </div>

              </div>
            </React.Fragment>
          )
        })
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
