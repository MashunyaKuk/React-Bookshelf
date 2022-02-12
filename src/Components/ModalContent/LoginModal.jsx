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

const StyledLoginModal = styled.div`
  font-family: 'Montserrat';
  text-align: center;
  
  .loginform {
    margin-bottom: 20px;
    
    &-title_p {
    font-size: 22px;
    margin-bottom: 20px;
    color: #212020;
    }
    
    &-item {
    margin-bottom: 15px;
    }
    
    &-item_formlabel {
    display: block;
    font-size: 14px;
    color: #212020;
    margin-bottom: 2px;
    }
    &-register_p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  }

  .login_btn, .register_btn {
    color: #F6F5F3;
    font-family: 'Montserrat';
    padding: 10px 30px;
    cursor: pointer;
    background-color: #C89566;
    border: none;
    border-radius: 4px;
    font-size: 14px;
  }

  .login_btn {
    background-color:  #7E929F;
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
              console.log('userdata', userData.loggedIn);
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
          <button
            type="submit"
            className="login_btn"
          >Login</button>
        </Form>
      </Formik>
      <div className="loginform-register">
        <p className="loginform-register_p">Don't you have the account? Please, register</p>
      </div>
      <button
        className="btn register_btn"
        type="button"
        onClick={() => {
          setModalContent(
            <RegisterModal />
          )
        }}>
        Register
      </button>
    </StyledLoginModal>
  );
};

export default LoginModal;
