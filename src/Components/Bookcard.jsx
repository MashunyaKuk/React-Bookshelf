import React from 'react';
import styled from 'styled-components';
import bookCover from '../assets/img/bookcover.jpg';
import { ROUTE } from '../Root/routes';
import { useHistory } from "react-router-dom";

const StyledBookcard = styled.div`
font-family: 'Montserrat';
margin: auto;
max-width: 1170px;
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
  }

  .bookcard-cover_img {
    border-radius: 4px;
    width: 120px;
    height: 200px;
    object-fit: cover;
  }

  .bookcard-author {
    overflow: hidden;
    max-height: 80px;
  }

  .bookcard-name, .bookcard-author_p {
    color: #212020;
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
          history.push({ pathname: ROUTE.BOOK, state: { all: props.all }, search: "?" + new URLSearchParams(`author=${props.authors}&title=${props.title}`) });
        }}
        className="want-read_btn">
        Details
      </button>
    </StyledBookcard >
  );
};

export default Bookcard;

