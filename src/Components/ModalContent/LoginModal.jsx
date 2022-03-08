import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import FormikInput from '../../Components/FormikInputs/FormikInputs';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import RegisterModal from '../../Components/ModalContent/RegisterModal';
import { useHistory } from "react-router-dom";
import { PATHS } from '../../Root/routes';
import { logInUser } from '../../store/actions/userActions';
import { loginUser } from '../../api/instance';
import { useDispatch } from 'react-redux';
import { loginValidation } from '../../validation/loginValidation';
import Button from '../../Components/Button';
import { COLORS } from '../../assets/styles/colors';

const StyledLoginModal = styled.div`
  font-family: 'Montserrat';
  text-align: center;
  
  .loginform {
    margin-bottom: 20px;
    
    @media (max-width: 767px) {
      margin-bottom: 15px;
    }

    &-title_p {
      font-size: 22px;
      margin-bottom: 20px;
      color: ${COLORS.BLACK};

      @media (max-width: 767px) {
        font-size: 18px;
        margin-bottom: 15px;
      }
    }
    
    &-item {
      margin-bottom: 15px;

      @media (max-width: 767px) {
        margin-bottom: 10px;
      }
    }
    
    &-item_formlabel {
      display: block;
      font-size: 14px;
      color: ${COLORS.BLACK};
      margin-bottom: 2px;

      @media (max-width: 767px) {
        font-size: 12px;
      }
    }

    &-register_p {
      font-size: 14px;
      margin-bottom: 10px;

      @media (max-width: 767px) {
        font-size: 12px;
      }
    }
  }
`;

const LoginModal = () => {
  const setModalContent = useContext(ModalContext);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <StyledLoginModal>
      <div className="loginform-title">
        <h2 className="loginform-title_p">Login</h2>
      </div>
      <Formik initialValues={{ email: '', password: '' }}
        onSubmit={(formData) => {
          loginUser(formData.email, formData.password)
            .then(({ userData }) => {
              dispatch(logInUser(userData.userName, userData.userSurname, formData.email, formData.password, userData.userId, userData.loggedIn));
              history.push(PATHS.PROFILE_ABOUT(userData.userId));
              setModalContent(false)
            })
        }}
        validate={loginValidation}>
        <Form className="loginform">
          <div className="loginform-item">
            <label htmlFor="email" className="loginform-item_formlabel">Email</label>
            <FormikInput name="email" />
          </div>
          <div className="loginform-item">
            <label htmlFor="password" className="loginform-item_formlabel">Password</label>
            <FormikInput name="password" />
          </div>
          <Button
            type="submit"
            color={COLORS.BLUE}
          >Login</Button>
        </Form>
      </Formik>
      <div className="loginform-register">
        <p className="loginform-register_p">Don't you have the account? Please, register</p>
      </div>
      <Button
        type="button"
        color={COLORS.ORANGE}
        onClick={() => {
          setModalContent(
            <RegisterModal />
          )
        }}>
        Register
      </Button>
    </StyledLoginModal>
  );
};

export default LoginModal;
