import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { librarySelector } from '../store/selectors/librarySelector';
import { userSelector } from '../store/selectors/userSelectors';
import bookCover from '../assets/img/bookcover.jpg';
import { bookToReadAdd } from '../store/actions/bookToReadActions';
import { booksToReadAdd } from '../api/booksToReadInstance';
import { getCover } from '../api/libraryInstance';
import LazyImage from '../Components/LazyImage';
import { booksToReadSelector } from '../store/selectors/booksToReadSelector';
import { readingNowBooksSelector } from '../store/selectors/readingNowBooksSelector';
import { readBooksSelector } from '../store/selectors/readBooksSelector';
import { COLORS } from '../assets/styles/colors';

const StyledBookScene = styled.div`
font-family: 'Montserrat';
margin: 0 auto 30px auto;
max-width: 1170px;
min-height: calc(100vh - 295px);

  @media (max-width: 767px) {
    min-height: calc(100vh - 235px);
  }

.bookholder {
  display: flex;
  align-items: flex-start;

  &-cover {
    margin: 0 30px 0 20px;
    display: flex;
    width: 350px;
    height: 550px;

    @media (max-width: 992px) {
      width: 250px;
      height: 450px;
    }
    @media (max-width: 767px) {
      width: 200px;
      height: 350px;
      margin: 0 20px 0 20px;
    }
    @media (max-width: 480px) {
      width: 130px;
      height: 240px;
      margin: 0 15px 0 10px;
    }

    &_img {
      width: 350px;
      height: 550px;
      border-radius: 8px;

      @media (max-width: 992px) {
        width: 250px;
        height: 450px;
      }
      @media (max-width: 767px) {
        width: 200px;
        height: 350px;
      }
      @media (max-width: 480px) {
        width: 130px;
        height: 240px;
      }
    }
  }

  &-book {
    max-width: 500px;

    @media (max-width: 992px) {
      max-width: 400px;
    }
    @media (max-width: 767px) {
      padding-right: 20px;
    }
    @media (max-width: 480px) {
      margin: 0 10px 0 0;
      padding-right: 0;
    }
  }

  &-title {
    font-size: 28px;
    margin-bottom: 10px;

    @media (max-width: 767px) {
      font-size: 20px;
    }
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }

  &-author {
    margin-bottom: 30px;

    @media (max-width: 767px) {
        margin-bottom: 15px;
      }
    &_p {
      font-size: 18px;

      @media (max-width: 767px) {
        font-size: 16px;
      }
      @media (max-width: 480px) {
        font-size: 14px;
      }
    }
}
  &-year {
    margin-bottom: 10px;
    &_p {
      font-size: 14px;

      @media (max-width: 767px) {
        font-size: 12px;
      }
      @media (max-width: 480px) {
        font-size: 10px;
      }
    }
  }

  &-pages, &-text {
    margin-bottom: 30px;
    
    @media (max-width: 767px) {
      margin-bottom: 15px;
    }
    &_p {
      font-size: 14px;

      @media (max-width: 767px) {
        font-size: 12px;
      }
      @media (max-width: 480px) {
        font-size: 10px;
      }
    }
  }
}

.addbook-btn__before {
  color: ${COLORS.WHITE};
  font-family: 'Montserrat';
  padding: 10px 30px;
  cursor: pointer;
  background-color: ${COLORS.ORANGE};
  border: none;
  border-radius: 4px;
  font-size: 14px;

  @media (max-width: 992px) {
    padding: 9px 25px;
    font-size: 13px;
  }
  @media (max-width: 767px) {
    padding: 8px 13px;
    font-size: 11px;
  }
} 

.addbook-btn__after {
  background-color: transparent;
  color: ${COLORS.BLACK};
  font-family: 'Montserrat';
  font-weight: 600;
  border: none;
  padding: 0;
  font-size: 16px;
  border: none;

  @media (max-width: 992px) {
    font-size: 13px;
  }
  @media (max-width: 767px) {
    font-size: 11px;
  }
}

.added-book_p {
  font-family: 'Montserrat';
  font-weight: 600;
  border: none;
  padding: 0;
  font-size: 16px;
} 

`;

const BookScene = () => {
  const params = useParams();
  const urlParams = Number(params.bookId);
  const libraryList = useSelector(librarySelector);
  const user = useSelector(userSelector);
  const userId = user.id;
  const dispatch = useDispatch();

  const currentBook = () => {
    const book = libraryList.filter(book => book._version_ == urlParams);
    if (book) {
      return book[0];
    }
  }
  const covers = () => {
    let result = currentBook().isbn === undefined ? '1' : currentBook().isbn[0];
    return result;
  }

  const currentBookId = currentBook()._version_;
  const currentBookCover = covers();
  const currentBookTitle = currentBook().title;
  const currentBookAuthors = currentBook().author_name.join(", ");
  const currentBookFirstPublishedYear = currentBook().first_publish_year;
  const currentBookPages = currentBook().number_of_pages_median;
  const currentBookText = currentBook().first_sentence && currentBook().first_sentence.join("/ ");

  const [btnText, setBtnText] = useState("Want to read");
  const btnStyles = () => {
    if (btnText === "Want to read") {
      return "addbook-btn__before"
    }
    else {
      return "addbook-btn__after"
    }
  }

  const myBooksToRead = useSelector(booksToReadSelector);
  const myReadingBooks = useSelector(readingNowBooksSelector);
  const myReadBooks = useSelector(readBooksSelector);

  const [coverImage, setCoverImage] = useState();
  useEffect(() => {
    let mounted = true; //переменная, отвечающая за то, чтобы не обновлять состояние, если компонент еще не смонтирован
    getCover(currentBookCover)
      .then((data) => {
        if (mounted) {
          if (data.size < 808) {
            setCoverImage(bookCover);
          } else {
            setCoverImage(`https://covers.openlibrary.org/b/isbn/${currentBookCover}-L.jpg`);
          }
        }
      })
      .catch(() => {
      })
    return () => mounted = false;
  }, []);

  return (
    <StyledBookScene className="bookscene-container">
      <div className="bookholder">
        <div className="bookholder-cover">
          <LazyImage src={coverImage} alt="book-cover" className="bookholder-cover_img" />
        </div>
        <div className="bookholder-book">
          <h4 className="bookholder-title">
            {currentBookTitle}
          </h4>
          <div className="bookholder-author">
            <p className="bookholder-author_p">
              {currentBookAuthors}
            </p>
          </div>
          <div className="bookholder-year">
            <p className="bookholder-year_p">
              First year of publication: {currentBookFirstPublishedYear}
            </p>
          </div>
          <div className="bookholder-pages">
            <p className="bookholder-pages_p">
              Number of pages: {currentBookPages}
            </p>
          </div>
          <div className="bookholder-text">
            <p className="bookholder-text_p">
              {currentBookText}
            </p>
          </div>
          {(user.loggedIn !== true) ?
            <div className="added-book">
              <p className="added-book_p">
                Please, register or login!
              </p>
            </div>
            : (!(myBooksToRead.find(book => book.bookId === urlParams)) && !(myReadingBooks.find(book => book.bookId === urlParams)) && !(myReadBooks.find(book => book.bookId === urlParams)) ?
              <button
                type="button"
                className={btnStyles()}
                onClick={(event) => {
                  booksToReadAdd(currentBookId, currentBookTitle, currentBookAuthors, currentBookCover, currentBookFirstPublishedYear, userId)
                    .then(({ dataBook }) => {
                      dispatch(bookToReadAdd(dataBook.bookId, dataBook.bookTitle, dataBook.bookAuthors, dataBook.bookCover, dataBook.bookFirstYear, dataBook.userId));
                      setBtnText("In your library already!");
                    })
                  event.currentTarget.disabled = true;
                }}>
                {btnText}
              </button>
              :
              <div className="added-book">
                <p className="added-book_p">
                  In your library already!
                </p>
              </div>)
          }
        </div>
      </div>
    </StyledBookScene >
  );
};

export default BookScene;

