export const registerValidation = (formData) => {
  const errorObj = {};
  let isFormValid = true;

  if (!formData.name) {
    errorObj.name = 'Please input name'
    isFormValid = false;
  } else if (formData.name.length < 3) {
    errorObj.name = 'Please input correct name - at least 3 characters'
    isFormValid = false;
  }

  if (!formData.surname) {
    errorObj.surname = 'Please input surname'
    isFormValid = false;
  } else if (formData.surname.length < 3) {
    errorObj.surname = 'Please input correct surname - at least 3 characters'
    isFormValid = false;
  }

  if (!formData.email) {
    errorObj.email = 'Please input email'
    isFormValid = false;
  } else if (formData.email.length < 5) {
    errorObj.email = 'Please input correct email - at least 5 characters'
    isFormValid = false;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
    errorObj.email = 'Incorrect email address';
    isFormValid = false;
  }

  if (!formData.password) {
    errorObj.password = 'Please input password'
    isFormValid = false;
  } else if (formData.password.length < 5) {
    errorObj.password = 'Please input correct password - at least 5 characters'
    isFormValid = false;
  } else if (!/[a-z]/.test(formData.password)) {
    errorObj.password = ('Please input correct password - at least one lowercase letter')
    isFormValid = false;
  } else if (!/[0-9]/.test(formData.password)) {
    errorObj.password = ('Please input correct password - at least one digit')
    isFormValid = false;
  } else if (!/[A-Z]/.test(formData.password)) {
    errorObj.password = ('Please input correct password - at least one uppercase letter')
    isFormValid = false;
  }

  return isFormValid ? null : errorObj;
}