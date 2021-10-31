import React from 'react';
import styled from 'styled-components';
import BookCard from '../Components/BookCard';

const StyledBookHolder = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: center;
justify-content: flex-start;
flex-wrap: wrap;

`;

const BookHolder = () => {
  return (
    <StyledBookHolder className="bookholder-container">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </StyledBookHolder>
  );
};

export default BookHolder;
