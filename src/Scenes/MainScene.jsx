/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import background from '../assets/img/main-bg.png';

const StyledMainScene = styled.div`
  font-family: 'Montserrat';
  max-width: 1170px;
  margin: auto;

  .main-screen-container {
    height: calc(100vh - 100px); //высчитать и отнять высоту header
    background-image: url(${background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .main-screen-textholder {
    padding-top: 170px;
    max-width: 500px;
    margin: auto;
    text-align: center;
    }

  .main-screen-title {
    font-size: 38px;
    margin-bottom: 30px;
    color: #212020;
  }

  .main-screen-description {
    margin-bottom: 30px;
    &_p {
      font-size: 18px;
      color: #212020;
    }
  }

  .try-free_btn {
    color: #F6F5F3;
    font-family: 'Montserrat';
    padding: 10px 30px;
    cursor: pointer;
    background-color: #C89566;
    border: none;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const MainScene = () => {
  return (
    <StyledMainScene>
      <div className="main-screen-container">
        <div className="main-screen-textholder">
          <h1 className="main-screen-title">
            Thousands of books you have always with you
          </h1>
          <div className="main-screen-description">
            <p className="main-screen-description_p">
              Online library
            </p>
          </div>
          <button className="btn try-free_btn">
            Try it
          </button>
        </div>
      </div>
      <div className="advantages-container">
        Section 2
      </div>
      <div className="subscription-container">
        Section 3
      </div>
      <div className="top-books-container">
        Section 4
      </div>
      <div className="collection-books-container">
        Section 5
      </div>
    </StyledMainScene>
  );
};

export default MainScene;
