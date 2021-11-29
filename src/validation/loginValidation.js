export const loginValidation = (formData) => {
  const errorObj = {};
  let isFormValid = true;

  if (!formData.email) {
    errorObj.email = 'Please input email'
    isFormValid = false;
  } else if (formData.email.length < 5) {
    errorObj.email = 'Please input correct email - at least 5 characters'
    isFormValid = false;
  }

  if (!formData.password) {
    errorObj.password = 'Please input password'
    isFormValid = false;
  } else if (formData.password.length < 5) {
    errorObj.password = 'Please input correct email - at least 5 characters'
    isFormValid = false;
  }

  return isFormValid ? null : errorObj;
}