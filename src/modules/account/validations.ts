import * as yup from 'yup';

const yupPassword = yup
  .string()
  .required('Please Enter your passwrod')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
  );

export const schemaUpdatePhone = yup.object().shape({
  phone: yup
    .string()
    .required('Please Enter your phone number')
    .matches(/^(\+84|0)*[1-9]\d{8}$/g, 'Phone number is not in the correct format'),
});

export const schemaChangePassWord = yup.object().shape({
  currentPassword: yupPassword,
  newPassword: yupPassword,
  passwordConfirm: yupPassword.oneOf([yup.ref('newPassword'), null], 'passwordConfirm must match'),
});
