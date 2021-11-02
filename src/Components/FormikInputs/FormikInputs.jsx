import React from 'react';
import { useField } from 'formik';

const FormikInput = (props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <>
      <input {...field} />
      {(meta.touched && meta.error) &&
        <div>
          {meta.error}
        </div>
      }
    </>
  )
}

export default FormikInput;