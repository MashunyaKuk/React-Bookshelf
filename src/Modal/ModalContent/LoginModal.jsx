import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import FormikInput from '../../Components/FormikInputs/FormikInputs';
import { ModalContext } from '../../HOC/GlobalModalProvider';

const StyledLoginModal = styled.div`
    margin-right: 20px;
;
`;

const LoginModal = () => {
  const setModalContent = useContext(ModalContext);

  return (
    <StyledLoginModal>
      <Formik initialValues={{ name: '', email: '', password: '' }}
        onSubmit={(formData) => {
          console.log("formData", formData)
        }}
        validate={(formData) => {
          const errorObj = {};
          let isFormValid = true;

          if (!formData.name) {
            errorObj.name = 'Please input name'
            isFormValid = false;
          }
          if (!formData.email) {
            errorObj.email = 'Please input email'
            isFormValid = false;
          }
          if (!formData.password) {
            errorObj.password = 'Please input password'
            isFormValid = false;
          }

          return isFormValid ? null : errorObj;
        }}>
        <Form>
          <div className="loginform-item">
            <label htmlFor="name" className="loginform-item_formlabel">Name</label>
            <FormikInput name="name" />
          </div>
          <div className="loginform-item">
            <label htmlFor="email" className="loginform-item_formlabel">Email</label>
            <FormikInput name="email" />
          </div>
          <div className="loginform-item">
            <label htmlFor="password" className="loginform-item_formlabel">Password</label>
            <FormikInput name="password" />
          </div>
          <button type="submit" onClick={() => {
            setModalContent(false)
          }}>Register</button>
        </Form>
      </Formik>

    </StyledLoginModal>
  );
};

export default LoginModal;
