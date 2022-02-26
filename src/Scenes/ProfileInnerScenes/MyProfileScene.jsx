import React from 'react';
import styled from 'styled-components';
import testUser from '../../assets/img/testUser.png';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelectors';

const StyledMyProfileScene = styled.div`
  font-family: 'Montserrat';
  
  .my-profile {
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

const MyProfileScene = () => {
  const user = useSelector(userSelector);
  return (
    <StyledMyProfileScene>
      <div className="my-profile-container">
        <div className="my-profile-photo">
          <img src={testUser} alt="usertest" className="my-profile-photo_img" />
        </div>
        <div className="my-profile-item">
          <p className="my-profile-title">Name:</p>
          <p className="my-profile-userdata">{user.name}</p>
        </div>
        <div className="my-profile-item">
          <p className="my-profile-title">Surname:</p>
          <p className="my-profile-userdata">{user.surname}</p>
        </div>
        {/* <div className="my-profile-item">
          <p className="my-profile-title">About:</p>
          <p className="my-profile-userdata">Information about user</p>
        </div> */}
      </div>
    </StyledMyProfileScene>
  );
};

export default MyProfileScene;
