import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 250px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #212020;
  border-radius: 4px;
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