import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import FormikInput from '../../Components/FormikInputs/FormikInputs';
import { ModalContext } from '../../HOC/GlobalModalProvider';
import { newUserAdd } from '../../store/actions/userActions';
import { PATHS } from '../../Root/routes';
import LoginModal from '../../Components/ModalContent/LoginModal';
import { registerUser } from '../../api/instance';
import { registerValidation } from '../../validation/registerValidation';
import Button from '../../Components/Button';
import { COLORS } from '../../assets/styles/colors';

const StyledRegisterModal = styled.div`
  font-family: 'Montserrat';
  text-align: center;
  
  .registerform {
    margin-bottom: 20px;

    @media (max-width: 767px) {
      margin-bottom: 15px;
    }

    &-title_p {
      font-size: 22px;
      margin-bottom: 20px;
      color: ${COLORS.BLACK};

      @media (max-width: 767px) {
        margin-bottom: 15px;
        font-size: 18px;
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

    &-login_p {
      font-size: 14px;
      margin-bottom: 10px;

      @media (max-width: 767px) {
        font-size: 12px;
      }
    }
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
        initialValues={{ name: '', surname: '', email: '', password: '' }}
        onSubmit={(formData) => {
          registerUser(formData.name, formData.surname, formData.email, formData.password)
            .then(({ dataId, dataLogged }) => {
              dispatch(newUserAdd(formData.name, formData.surname, formData.email, formData.password, dataId, dataLogged));
              history.push(PATHS.PROFILE_ABOUT(dataId));
              setModalContent(false);
            })
        }}
        validate={registerValidation}>
        <Form className="registerform">
          <div className="registerform-item">
            <label htmlFor="name" className="registerform-item_formlabel">Name</label>
            <FormikInput name="name" />
          </div>
          <div className="registerform-item">
            <label htmlFor="surname" className="registerform-item_formlabel">Surname</label>
            <FormikInput name="surname" />
          </div>
          <div className="registerform-item">
            <label htmlFor="email" className="registerform-item_formlabel">Email</label>
            <FormikInput name="email" />
          </div>
          <div className="registerform-item">
            <label htmlFor="password" className="registerform-item_formlabel">Password</label>
            <FormikInput name="password" />
          </div>
          <Button
            color={COLORS.ORANGE}
            type="submit"
          >Register
          </Button>
        </Form>
      </Formik>
      <div className="registerform-login">
        <p className="registerform-login_p">Do you have the account? Please, login</p>
      </div>
      <Button
        color={COLORS.BLUE}
        type="button"
        onClick={() => {
          setModalContent(
            <LoginModal />
          )
        }}>
        Login
      </Button>
    </StyledRegisterModal >
  );
};

export default RegisterModal;
