import React from 'react';
import styled from 'styled-components';

const StyledBookFilters = styled.div`
  font-family: 'Montserrat';
  width: 200px;

  .book-filters_holder {
    border: 1px solid #212020;
    border-radius: 4px;
    padding: 15px 50px 15px 50px;
}
  
`;

const BookFilters = () => {
  return (
    <StyledBookFilters>
      <div className="book-filters_holder">
        <div className="book-filter">
          <p className="book-filter_p">
            Genres
          </p>
        </div>
        <div>
          <input type="checkbox" id="classic-books" name="classic" />
          <label htmlFor="classic">Classic</label>
        </div>
        <div>
          <input type="checkbox" id="classic-books" name="classic" />
          <label htmlFor="classic">Classic</label>
        </div>
        <div>
          <input type="checkbox" id="classic-books" name="classic" />
          <label htmlFor="classic">Classic</label>
        </div>
      </div>
    </StyledBookFilters>
  );
};

export default BookFilters;
