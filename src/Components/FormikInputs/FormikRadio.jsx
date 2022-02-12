import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledRadio = styled.input`
  appearance: none;
  background: #F6F5F3;
  width: 15px;
  height: 15px;
  border: 2px solid #6E7064;
  border-radius: 50%;
  margin: 0 10px 0 0;
  cursor: pointer;
    &:checked {
  background: #6E7064;
  }
`

const FormikRadio = (props) => {
  const [field, meta, helpers] = useField(props);
  //console.log('props.value', props)

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