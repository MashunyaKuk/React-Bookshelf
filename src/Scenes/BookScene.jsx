import React, { useState } from 'react';
import styled from 'styled-components';
import { getBooks } from '../api/libraryInstance';

const StyledBookScene = styled.div`
font-family: 'Montserrat';
`;

const BookScene = () => {
  const [books, setBooks] = useState(null);
  return (
    <StyledBookScene className="bookcard-container">
      <div className="bookcard-about">
        <h4 className="bookcard-name">
          Book scene
        </h4>
        <button
          type="button"
          onClick={() => {
            getBooks('rowling')
              .then((data) => {
                setBooks(data);
              })
          }}
        >
          Get Books
        </button>
        <div>
          {books &&
            books.map((book, index) => {
              const authors = book.author_name.join(", ");
              const covers = () => {
                let result = book.isbn === undefined ? '0385472579' : book.isbn[0]
                return result;
              }
              return (
                <div className="book" key={index}>
                  <p>Book {index + 1}</p>
                  <p>Author {authors}</p>
                  <p>{book.title}</p>
                  <img src={`https://covers.openlibrary.org/b/isbn/${covers()}-M.jpg`} alt="" />

                </div>
              );
            })}
        </div>
      </div>
    </StyledBookScene >
  );
};

export default BookScene;

