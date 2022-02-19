import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import { COLORS } from '../../assets/styles/colors';

const StyledRadio = styled.input`
  appearance: none;
  background: ${COLORS.WHITE};
  width: 15px;
  height: 15px;
  border: 2px solid ${COLORS.DARK_GREY};
  border-radius: 50%;
  margin: 0 10px 0 0;
  cursor: pointer;
    &:checked {
  background: ${COLORS.DARK_GREY};
  }
`

const FormikRadio = (props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <StyledRadio {...field} value={props.value} type="radio" />
      {(meta.touched && meta.error) &&
        <div>
          {meta.error}
        </div>
      }
    </>
  )
}

export default FormikRadio;