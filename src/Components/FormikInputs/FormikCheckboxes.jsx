import React from 'react';
import { useField } from 'formik';

const FormikCheckboxes = (props) => {
  const [field, meta, helpers] = useField(props);
  //console.log('props.value', props)

  return (
    <>
      <input {...field} value={props.value} type="radio" />
      {(meta.touched && meta.error) &&
        <div>
          {meta.error}
        </div>
      }
    </>
  )
}

export default FormikCheckboxes;