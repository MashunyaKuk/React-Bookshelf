import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { librarySelector } from '../store/selectors/librarySelector';
import { userSelector } from '../store/selectors/userSelectors';
import bookCover from '../assets/img/bookcover.jpg';
import { bookToReadAdd } from '../store/actions/bookToReadActions';
import { booksToReadSelector } from '../store/selectors/booksToReadSelector';
import { booksToReadAdd, bookToRead } from '../api/booksToReadInstance';

const StyledBookScene = styled.div`
font-family: 'Montserrat';
margin: 0 auto 30px auto;
max-width: 1170px;

.bookholder {
  display: flex;
  align-items: center;

  &-cover {
    margin-right: 30px;
    background-image: url(${bookCover});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;

    &_img {
      width: 350px;
      height: 550px;
    }
  }

  &-book {
    max-width: 500px;
  }

  &-title {
    font-size: 28px;
    margin-bottom: 10px;
  }

  &-author {
    margin-bottom: 30px;
    &_p {
      font-size: 18px;
    }
}
  &-year {
    margin-bottom: 10px;
    &_p {
      font-size: 14px;
    }
  }

  &-pages {
    margin-bottom: 30px;
    &_p {
      font-size: 14px;
    }
  }

  &-text {
    margin-bottom: 30px;
    &_p {
      font-size: 14px;
    }
  }
}

.addbook-btn {
  color: #F6F5F3;
  font-family: 'Montserrat';
  padding: 10px 30px;
  cursor: pointer;
  background-color: #C89566;
  border: none;
  border-radius: 4px;
  font-size: 14px;
} 

.added-book_p {
  color: #212020;
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

  const myBooks = useSelector(booksToReadSelector);
  return (
    <StyledBookScene className="bookscene-container">
      <div className="bookholder">
        <div className="bookholder-cover">
          <img src={`https://covers.openlibrary.org/b/isbn/${currentBookCover}-L.jpg`} alt="book-cover" className="bookholder-cover_img" />
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
          {(user.loggedIn === true) && !(myBooks.find(book => book.bookId === urlParams)) ?
            <button
              type="button"
              className="addbook-btn"
              onClick={(event) => {
                booksToReadAdd(currentBookId, currentBookTitle, currentBookAuthors, currentBookCover, currentBookFirstPublishedYear, userId)
                  .then(({ dataBook }) => {
                    console.log('data', dataBook)
                    dispatch(bookToReadAdd(dataBook.bookId, dataBook.bookTitle, dataBook.bookAuthors, dataBook.bookCover, dataBook.bookFirstYear, dataBook.dataBookId));
                  })
                event.currentTarget.disabled = true;
              }}>
              Want to read
            </button>
            :
            <div className="added-book">
              <p className="added-book_p">
                In your library already!
              </p>
            </div>}
        </div>
      </div>
    </StyledBookScene >
  );
};

export default BookScene;

