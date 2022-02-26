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
import Button from '../../Components/Button';
import { COLORS } from '../../assets/styles/colors';

const StyledWantToReadScene = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: center;
flex-wrap: wrap;
align-items: stretch;

@media (max-width: 589px) {
  flex-direction: column;
}

.want-library-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  border: 1px solid ${COLORS.BLACK};
  border-radius: 4px;
  padding: 10px 20px;
  background-color: ${COLORS.DARK_ORANGE};
    
  @media (max-width: 635px) {
    flex-direction: column;
    margin-bottom: 15px;
    &:nth-child(2n+1) {
      margin-right: 10px;
    }
  }
  @media (max-width: 588px) {
    width: 200px;
    margin-bottom: 15px;
    &:nth-child(2n+1) {
      margin-right: 0;
    }
    padding: 10px 15px 15px 15px;
  } 
  @media (max-width: 480px) {
    width: 140px;
    margin-bottom: 10px;
    padding: 5px 7px 10px 7px;
  }
}  

  .bookcard {
    &-cover {
      margin-bottom: 5px;
      background-image: url(${bookCover});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      display: flex;
      border-radius: 4px;
      margin-right: 20px;

      @media (max-width: 992px) {
        margin-right: 10px;
      }
      @media (max-width: 635px) {
        margin-bottom: 10px;
        margin-right: 0;
      }
      
      &_img {
        width: 120px;
        height: 200px;
        object-fit: fill;
        border-radius: 4px;
        display: flex;

        @media (max-width: 992px) {
          width: 100px;
          height: 165px;
        }
        @media (max-width: 767px) {
          width: 90px;
          height: 150px;
        }
        @media (max-width: 635px) {
          width: 80px;
          height: 115px;
        }
        @media (max-width: 588px) {
          display: none;
        }
      }
    }

    &-author {
      overflow: hidden;
      max-height: 80px;
    }

    &-text {
      width: 150px;
      margin-right: 20px;

      @media (max-width: 992px) {
        margin-right: 13px;
      }
      @media (max-width: 767px) {
        width: 135px;
      }
      @media (max-width: 635px) {
        margin-bottom: 10px;
        margin-right: 0;
      }
    }

    &-name, &-author_p {
      font-size: 16px;
      margin: 0 0 15px 0;
      text-align: center;

      @media (max-width: 992px) {
        font-size: 14px;
      }
      @media (max-width: 767px) {
        font-size: 12px;
        margin-bottom: 10px;
      }
      @media (max-width: 480px) {
        margin-bottom: 7px;
      }
    }

    &-pages {
      font-size: 14px;
      text-align: center;

      @media (max-width: 992px) {
        font-size: 12px;
      }
      @media (max-width: 767px) {
        font-size: 10px;
      }
    }

    &-btn-group {
      min-height: 130px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-between;

      @media (max-width: 767px) {
        min-height: 100px;
      }
    }

    &-none_p {
      font-size: 18px;
      margin: 20px 0 0 20px;

      @media (max-width: 992px) {
        font-size: 16px;
      }
      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
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
                  <Button
                    type="button"
                    color={COLORS.DARK_GREY}
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
                  </Button>
                  <Button
                    type="button"
                    color={COLORS.ORANGE}
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
                  </Button>
                  <Button
                    type="button"
                    color={COLORS.RED}
                    onClick={() => {
                      booksToReadRemove(book.bookId)
                        .then(() => {
                          dispatch(bookToReadRemove(book.bookId));
                        })
                    }}>
                    Remove book
                  </Button>
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
