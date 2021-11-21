import React from 'react';
import styled from 'styled-components';
import bookCover from '../assets/img/bookcover.jpg';
import { PATHS } from '../Root/routes';
import { useHistory } from "react-router-dom";


const StyledBookcard = styled.div`
font-family: 'Montserrat';
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
width: 150px;
margin: 0 0 30px 30px;
  
.bookcard-cover {
  margin-bottom: 5px;
  background-image: url(${bookCover});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  border-radius: 4px;
}

  .bookcard-cover_img {
    width: 120px;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }

  .bookcard-author {
    overflow: hidden;
    max-height: 80px;
  }

  .bookcard-name, .bookcard-author_p {
    font-size: 14px;
    margin: 0 0 5px 0;
    text-align: center;
  }

  .want-read_btn {
    color: #F6F5F3;
    font-family: 'Montserrat';
    padding: 10px 15px;
    cursor: pointer;
    background-color: #C89566;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
  }
`;

const Bookcard = (props) => {
  const history = useHistory();
  const moveToBook = (id) => {
    history.push(PATHS.BOOK(id))
  }
  return (
    <StyledBookcard>
      <div className="bookcard-cover" >
        <img src={`https://covers.openlibrary.org/b/isbn/${props.cover()}-M.jpg`} alt="" className="bookcard-cover_img" />
      </div>
      <h4 className="bookcard-name">{props.title}</h4>
      <div className="bookcard-author">
        <p className="bookcard-author_p">
          {props.authors}
        </p>
      </div>
      <button
        onClick={() => {
          moveToBook(props.id);;
        }}
        className="want-read_btn">
        Details
      </button>
    </StyledBookcard >
  );
};

export default Bookcard;

