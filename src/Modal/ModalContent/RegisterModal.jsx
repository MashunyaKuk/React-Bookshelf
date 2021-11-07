import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import FormikInput from '../../Components/FormikInputs/FormikInputs';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import { newUserAdd } from '../../store/actions/userActions';
import { PATHS } from '../../Root/routes';
import LoginModal from '../../Modal/ModalContent/LoginModal';
import { registerUser } from '../../api/instance';


const StyledRegisterModal = styled.div`
  font-family: 'Montserrat';
  text-align: center;
  
  .registerform {
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
  &-login_p {
    font-size: 14px;
    margin-bottom: 10px;
  }
}

  input {
    width: 250px;
    font-size: 16px;
    padding: 10px;
    border: 1px solid #212020;
    border-radius: 4px;
  }
  
  .register_btn, .login_btn {
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
    background-color: #7E929F;
  }

`;

const RegisterModal = () => {
  const setModalContent = useContext(ModalContext);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <StyledRegisterModal>
      <div className="registerform-title">
        <h2 className="registerform-title_p">Registration</h2>
      </div>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(formData) => {
          registerUser(formData.name, formData.email, formData.password)
            .then(({ dataId, dataLogged }) => {
              console.log('data', dataId, dataLogged)
              dispatch(newUserAdd(formData.name, formData.email, formData.password, dataId, dataLogged));
              history.push(PATHS.PROFILE_ABOUT(dataId));
              setModalContent(false);
            })
        }}
        validate={(formData) => {
          const errorObj = {};
          let isFormValid = true;

          if (!formData.name) {
            errorObj.name = 'Please input name'
            isFormValid = false;
          } else if (formData.name.length < 3) {
            errorObj.name = 'Please input correct name - at least 3 characters'
            isFormValid = false;
          }

          if (!formData.email) {
            errorObj.email = 'Please input email'
            isFormValid = false;
          } else if (formData.email.length < 5) {
            errorObj.email = 'Please input correct email - at least 5 characters'
            isFormValid = false;
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            errorObj.email = 'Incorrect email address';
            isFormValid = false;
          }

          if (!formData.password) {
            errorObj.password = 'Please input password'
            isFormValid = false;
          } else if (formData.password.length < 5) {
            errorObj.email = 'Please input correct email - at least 5 characters'
            isFormValid = false;
          } else if (!/[a-z]/.test(formData.password)) {
            errorObj.password = ('Please input correct password - at least one lowercase letter')
            isFormValid = false;
          } else if (!/[0-9]/.test(formData.password)) {
            errorObj.password = ('Please input correct password - at least one digit')
            isFormValid = false;
          } else if (!/[A-Z]/.test(formData.password)) {
            errorObj.password = ('Please input correct password - at least one uppercase letter')
            isFormValid = false;
          }

          return isFormValid ? null : errorObj;
        }}>
        <Form className="registerform">
          <div className="registerform-item">
            <label htmlFor="name" className="registerform-item_formlabel">Name</label>
            <FormikInput name="name" />
          </div>
          <div className="registerform-item">
            <label htmlFor="email" className="registerform-item_formlabel">Email</label>
            <FormikInput name="email" />
          </div>
          <div className="registerform-item">
            <label htmlFor="password" className="registerform-item_formlabel">Password</label>
            <FormikInput name="password" />
          </div>
          <button
            className="btn register_btn"
            type="submit"
          >Register
          </button>
        </Form>
      </Formik>
      <div className="registerform-login">
        <p className="registerform-login_p">Do you have the account? Please, login</p>
      </div>
      <button
        className="btn login_btn"
        type="button"
        onClick={() => {
          setModalContent(
            <LoginModal />
          )
        }}>
        Login
      </button>
    </StyledRegisterModal >
  );
};

export default RegisterModal;
