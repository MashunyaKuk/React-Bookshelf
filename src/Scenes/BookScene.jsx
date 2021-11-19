import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { librarySelector } from '../store/selectors/librarySelector';
import bookCover from '../assets/img/bookcover.jpg';

const StyledBookScene = styled.div`
font-family: 'Montserrat';
margin: auto;
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
    &_p {
      font-size: 14px;
    }
  }
}
`;

const BookScene = () => {
  const params = useParams();
  const urlParams = params.userId;
  const libraryList = useSelector(librarySelector);
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
  console.log('currentBook', currentBook());
  console.log('urlParams', urlParams);
  return (
    <StyledBookScene className="bookscene-container">
      <div className="bookholder">
        <div className="bookholder-cover">
          <img src={`https://covers.openlibrary.org/b/isbn/${covers()}-L.jpg`} alt="book-cover" className="bookholder-cover_img" />
        </div>
        <div className="bookholder-book">
          <h4 className="bookholder-title">
            {currentBook().title}
          </h4>
          <div className="bookholder-author">
            <p className="bookholder-author_p">
              {currentBook().author_name.join(", ")}
            </p>
          </div>
          <div className="bookholder-year">
            <p className="bookholder-year_p">
              First year of publication: {currentBook().first_publish_year}
            </p>
          </div>
          <div className="bookholder-pages">
            <p className="bookholder-pages_p">
              Number of pages: {currentBook().number_of_pages_median}
            </p>
          </div>
          <div className="bookholder-text">
            <p className="bookholder-text_p">
              {currentBook().first_sentence &&
                currentBook().first_sentence.join(". ")}
            </p>
          </div>
        </div>
      </div>
    </StyledBookScene >
  );
};

export default BookScene;

