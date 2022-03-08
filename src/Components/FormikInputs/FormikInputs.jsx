import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { COLORS } from '../../assets/styles/colors';

const StyledInput = styled.input`
  width: 250px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid ${COLORS.BLACK};
  border-radius: 4px;
  
  @media (max-width: 767px) {
    width: 200px;
    font-size: 14px;
    padding: 8px;
  }

  @media (max-width: 500px) {
    padding: 5px;
    font-size: 12px;
  }

  @media (max-width: 380px) {
    width: 130px;
  }
`

const FormikInput = (props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <>
      <StyledInput {...field} />
      {(meta.touched && meta.error) &&
        <div>
          {meta.error}
        </div>
      }
    </>
  )
}

export default FormikInput;