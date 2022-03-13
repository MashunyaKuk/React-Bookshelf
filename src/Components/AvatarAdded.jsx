import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import testUser from '../assets/img/testUser.png';
import { COLORS } from '../assets/styles/colors';
import Button from '../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { avatarAdd } from '../store/actions/avatarActions';
import { useParams } from 'react-router-dom';
import { userAvatarSelector } from '../store/selectors/avatarSelector';
import IconDownload from '../assets/img/icons/download-icon.svg';
import { avatarAddToList } from '../api/avatarInstance';
import { ModalContext } from '../HOC/GlobalModalProvider';
import SuccessChangesModal from '../Components/ModalContent/SuccessChangesModal';

const StyledAvatarAdded = styled.div`
  font-family: 'Montserrat';
  margin-bottom: 30px;
  
  .edit-profile {
    &-photo {
      text-align: center;
      margin-bottom: 30px;
      //background-image: ${testUser};

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

    &-input_img {
      margin-left: 20px;
      font-family: 'Montserrat';
      cursor: pointer;
      font-size: 14px;
      display: none;
      
      &-label {
        display: inline-block;
        padding: 10px 30px;
        font-size: 14px;
        cursor: pointer;
        margin-right: 20px;
        border-radius: 4px;
        color: ${COLORS.BLACK};
        background-color: ${COLORS.GREY};

        @media (max-width: 992px) {
          padding: 9px 25px;
          font-size: 13px;
        }
        @media (max-width: 767px) {
          padding: 8px 13px;
          font-size: 11px;
        }
      }
      }      
  }
  .buttons-wrapper {
    display: flex;
  }
  
  .download-wrapper {
    display: flex;
    align-items: center;
  }

  .download-icon {
      height: 20px;
      margin-right: 10px;
  }
`;

const AvatarAdded = () => {
  const [userPhoto, setUserPhoto] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const urlUserId = Number(params.userId);
  const userAvatar = useSelector(userAvatarSelector);
  const setModalContent = useContext(ModalContext);

  return (
    <StyledAvatarAdded>
      {userAvatar.avatarImage ?
        <>
          <div className="edit-profile-photo">
            <img src={userAvatar.avatarImage} alt="usertest" className="edit-profile-photo_img" />
          </div>
        </>
        :
        <>
          <div className="edit-profile-photo">
            <img src={testUser} alt="usertest" className="edit-profile-photo_img" />
          </div>
        </>
      }
      <div className="buttons-wrapper">
        <div>
          <label htmlFor="file-upload" className="edit-profile-input_img-label">
            <div className="download-wrapper">
              <IconDownload className="download-icon" />
              <span className="download-text">Choose photo</span>
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            className="edit-profile-input_img"
            name="avatar"
            onChange={(event) => {
              let img = event.target.files[0];
              setUserPhoto(img);
              dispatch(avatarAdd(URL.createObjectURL(img), urlUserId));
            }} />
        </div>
        <Button
          type="button"
          color={COLORS.BLUE}
          onClick={() => {
            avatarAddToList(userPhoto, urlUserId);
            setModalContent(
              <SuccessChangesModal />
            )
          }}>
          Save avatar
        </Button>
      </div>

    </StyledAvatarAdded>
  );
};

export default AvatarAdded;


