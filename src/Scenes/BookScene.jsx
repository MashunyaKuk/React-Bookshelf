import React, { useState } from 'react';
import styled from 'styled-components';
import { getBooks } from '../api/libraryInstance';

const StyledBookScene = styled.div`
font-family: 'Montserrat';
margin: auto;
max-width: 1170px;
`;

const BookScene = (props) => {

  return (
    <StyledBookScene className="bookscene-container">
      <div className="bookholder">
        <div className="bookholder-cover"
        >
          <img src="#" alt="book-cover" className="bookholder-cover_img" />
        </div>
        <h4 className="bookholder-title">
          Book name
        </h4>
        <div className="bookholder-author">
          <p className="bookholder-author_p">
            Book author
          </p>
        </div>
        <div>BOOKS</div>
      </div>
    </StyledBookScene >
  );
};

export default BookScene;

