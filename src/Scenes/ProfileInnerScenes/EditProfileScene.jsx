import React from 'react';
import styled from 'styled-components';
import testUser from '../../assets/img/testUser.png';

const StyledEditProfileScene = styled.div`
  font-family: 'Montserrat';
  
  .edit-profile {
    &-photo {
      text-align: center;
      margin-bottom: 30px;

      @media (max-width: 480px) {
        margin-bottom: 20px;
      }
    }

    &-photo_img {
      max-width: 250px;

      @media (max-width: 767px) {
        max-width: 200px;
      }
      @media (max-width: 480px) {
        max-width: 130px;
      }
    }

    &-item {
      margin-bottom: 15px;
    }

    &-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;

      @media (max-width: 767px) {
        font-size: 14px;
      }
      @media (max-width: 480px) {
        font-size: 12px;
        margin-bottom: 5px;
      }
    }

    &-userdata {
      font-size: 14px;

      @media (max-width: 767px) {
        font-size: 12px;
      }
      @media (max-width: 480px) {
        font-size: 10px;
      }
    }
  }

`;

const EditProfileScene = () => {
  return (
    <StyledEditProfileScene>
      <div className="edit-profile-container">
        <div className="edit-profile-photo">
          <img src={testUser} alt="usertest" className="edit-profile-photo_img" />
        </div>
        <div className="edit-profile-item">
          <p className="edit-profile-title">Name:</p>
          <p className="edit-profile-userdata">Test name</p>
        </div>
        <div className="edit-profile-item">
          <p className="edit-profile-title">Surname:</p>
          <p className="edit-profile-userdata">Test surname</p>
        </div>
        <div className="edit-profile-item">
          <p className="edit-profile-title">About:</p>
          <p className="edit-profile-userdata">Information about user</p>
        </div>
      </div>
    </StyledEditProfileScene>
  );
};

export default EditProfileScene;
