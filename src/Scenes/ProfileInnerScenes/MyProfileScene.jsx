import React from 'react';
import styled from 'styled-components';
import testUser from '../../assets/img/testUser.png';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelectors';
import { userAvatarSelector } from '../../store/selectors/avatarSelector';

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
      width: 250px;
      height: 250px;
      border-radius: 50%;
      object-fit: cover;

      @media (max-width: 767px) {
        width: 200px;
        height: 200px;
      }
      @media (max-width: 480px) {
        width: 150px;
        height: 150px;
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
  const userAvatar = useSelector(userAvatarSelector);
  return (
    <StyledMyProfileScene>
      <div className="my-profile-container">
        <div className="my-profile-photo">
          {userAvatar.avatarImage
            ?
            <img src={userAvatar.avatarImage} alt="usertest" className="my-profile-photo_img" />
            :
            <img src={testUser} alt="usertest" className="my-profile-photo_img" />
          }
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
