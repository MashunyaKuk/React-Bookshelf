import React from 'react';
import styled from 'styled-components';
import testUser from '../../assets/img/testUser.png';

const StyledMyProfileScene = styled.div`
  font-family: 'Montserrat';
  
  .my-profile {
    &-photo {
      text-align: center;
      margin-bottom: 30px;
    }

    &-photo_img {
      width: 250px;
    }

    &-item {
      margin-bottom: 15px;
    }

    &-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    &-userdata {
      font-size: 12px;
    }
  }

`;

const MyProfileScene = () => {
  return (
    <StyledMyProfileScene>
      <div className="my-profile-container">
        <div className="my-profile-photo">
          <img src={testUser} alt="usertest" className="my-profile-photo_img" />
        </div>
        <div className="my-profile-item">
          <p className="my-profile-title">Name:</p>
          <p className="my-profile-userdata">Test name</p>
        </div>
        <div className="my-profile-item">
          <p className="my-profile-title">Surname:</p>
          <p className="my-profile-userdata">Test surname</p>
        </div>
        <div className="my-profile-item">
          <p className="my-profile-title">About:</p>
          <p className="my-profile-userdata">Information about user</p>
        </div>
      </div>
    </StyledMyProfileScene>
  );
};

export default MyProfileScene;
