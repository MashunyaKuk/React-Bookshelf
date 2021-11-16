import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";

const StyledBookScene = styled.div`
font-family: 'Montserrat';
margin: auto;
max-width: 1170px;

.bookholder {
  display: flex;
  align-items: center;

  &-cover {
    margin-right: 30px;
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

  const location = useLocation();
  console.log('data', location.state.all);
  const covers = () => {
    let result = location.state.all.isbn === undefined ? '1' : location.state.all.isbn[0];
    return result;
  }
  return (

    <StyledBookScene className="bookscene-container">
      <div className="bookholder">
        <div className="bookholder-cover">
          <img src={`https://covers.openlibrary.org/b/isbn/${covers()}-L.jpg`} alt="book-cover" className="bookholder-cover_img" />
        </div>

        <div className="bookholder-book">
          <h4 className="bookholder-title">
            {location.state.all.title}
          </h4>
          <div className="bookholder-author">
            <p className="bookholder-author_p">
              {location.state.all.author_name.join(", ")}
            </p>
          </div>
          <div className="bookholder-year">
            <p className="bookholder-year_p">
              First year of publication: {location.state.all.first_publish_year}
            </p>
          </div>
          <div className="bookholder-pages">
            <p className="bookholder-pages_p">
              Number of pages: {location.state.all.number_of_pages_median}
            </p>
          </div>
          <div className="bookholder-text">
            <p className="bookholder-text_p">
              "{location.state.all.first_sentence.join(". ")}"
            </p>
          </div>
        </div>
      </div>
    </StyledBookScene >
  );
};

export default BookScene;

