import React, { useContext } from 'react';
import styled from 'styled-components';
import bookCover from '../assets/img/bookcover.jpg';

const StyledBookCard = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: left;
flex-direction: column;
margin: 0 0 30px 40px;

  .bookcard-cover {
    margin-bottom: 5px;
  }

  .bookcard-cover_img {
    border-radius: 4px;
    width: 120px;
  }

  .bookcard-name, .bookcard-author_p {
    color: #212020;
    font-size: 14px;
    margin: 0 0 5px 0;
  }

  .want-read_btn {
    color: #F6F5F3;
    font-family: 'Montserrat';
    padding: 10px 5px;
    cursor: pointer;
    background-color: #C89566;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
  }
`;

const BookCard = () => {
  return (
    <StyledBookCard className="bookcard-container">
      <div className="bookcard-cover">
        <img className="bookcard-cover_img" src={bookCover} />
      </div>
      <div className="bookcard-about">
        <h4 className="bookcard-name">
          Book name
        </h4>
        <div className="bookcard-author">
          <p className="bookcard-author_p">
            Book description
          </p>
        </div>
      </div>
      <button className="btn want-read_btn">
        Want to read
      </button>
    </StyledBookCard>
  );
};

export default BookCard;
