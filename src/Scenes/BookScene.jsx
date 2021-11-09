import React from 'react';
import styled from 'styled-components';
import { getBooks } from '../api/libraryInstance';

const StyledBookScene = styled.div`
font-family: 'Montserrat';
`;

const BookScene = () => {

  return (
    <StyledBookScene className="bookcard-container">
      <div className="bookcard-about">
        <h4 className="bookcard-name">
          Book scene
        </h4>
        <button
          type="button"
          onClick={() => {
            getBooks('tolkien')
              .then((booksByAuthors) => {
                console.log('booksByAuthors', booksByAuthors);
              })
          }}
        >
          Get Books
        </button>
        <div>

        </div>
      </div>
    </StyledBookScene >
  );
};

export default BookScene;

