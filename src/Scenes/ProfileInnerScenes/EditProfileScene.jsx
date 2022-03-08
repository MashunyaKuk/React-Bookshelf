import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import testUser from '../../assets/img/testUser.png';
import { Formik, Form } from 'formik';
import FormikInput from '../../Components/FormikInputs/FormikInputs';
import Button from '../../Components/Button';
import { COLORS } from '../../assets/styles/colors';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelectors';
import { changeUser } from '../../api/instance';
import { registerValidation } from '../../validation/registerValidation';
import { changeUserData } from '../../store/actions/userActions';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import SuccessChangesModal from '../../Components/ModalContent/SuccessChangesModal';
import AvatarAdded from '../../Components/AvatarAdded';

const StyledEditProfileScene = styled.div`
  font-family: 'Montserrat';
  
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

      }

    &-item {
      margin-bottom: 15px;

      @media (max-width: 767px) {
        margin-bottom: 10px;
      }

      &_formlabel {
        display: inline-block;
        min-width: 100px;

        @media (max-width: 767px) {
          min-width: 75px;
          font-size: 13px;
        }
        
        @media (max-width: 500px) {
          min-width: 100px;
          margin-bottom: 8px;
        }
      }
        
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
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const setModalContent = useContext(ModalContext);
  return (
    <StyledEditProfileScene>
      <div className="edit-profile-container">
        <AvatarAdded />
        <Formik initialValues={{ name: user.name, surname: user.surname, email: user.email, password: user.password }}
          onSubmit={(formData) => {
            changeUser(formData.name, formData.surname, formData.email, formData.password)
              .then((userData) => {
                dispatch(changeUserData(userData.userName, userData.userSurname, userData.userEmail, userData.userPassword, userData.userId, userData.loggedIn));
                setModalContent(
                  <SuccessChangesModal />
                )
              })
          }}
          validate={registerValidation}>
          <Form>
            <div className="edit-profile-item">
              <label htmlFor="name" className="edit-profile-item_formlabel">Name:</label>
              <FormikInput name="name" />
            </div>
            <div className="edit-profile-item">
              <label htmlFor="surname" className="edit-profile-item_formlabel">Surname:</label>
              <FormikInput name="surname" />
            </div>
            <div className="edit-profile-item">
              <label htmlFor="email" className="edit-profile-item_formlabel">Email:</label>
              <FormikInput name="email" />
            </div>
            <div className="edit-profile-item">
              <label htmlFor="password" className="edit-profile-item_formlabel">Password:</label>
              <FormikInput name="password" />
            </div>

            <Button
              type="submit"
              color={COLORS.ORANGE}
            >Save changes</Button>
          </Form>
        </Formik>

      </div>
    </StyledEditProfileScene>
  );
};

export default EditProfileScene;


