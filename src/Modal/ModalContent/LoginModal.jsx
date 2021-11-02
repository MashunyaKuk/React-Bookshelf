import React, { useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import FormikInput from '../../Components/FormikInputs/FormikInputs';

const StyledLoginModal = styled.div`
    margin-right: 20px;
;
`;

const LoginModal = (props) => {
  /* const setModalContent = useContext(ModalContext); */

  return (
    <StyledLoginModal>
      <Formik initialValues={{ name: 'Alex', email: 'example@gmail.com', password: '*****' }}
        onSubmit={(formData) => {
          console.log('formsubmit', formData);
        }}
        validate={(formData) => {
          console.log('formdata', formData);
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
          <button type="submit" className="loginform-button_submit">Register</button>
        </Form>
      </Formik>

    </StyledLoginModal>
  );
};

export default LoginModal;
