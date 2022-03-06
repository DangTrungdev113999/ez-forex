import * as yup from 'yup';

const yupEmail = yup.string().required('Please Enter your email').email('something went wrong');

const yupPassword = yup.string().required('Please Enter your password');

export const schemaLogin = yup.object().shape({
  email: yupEmail,
  password: yupPassword,
});

export const schemaRegister = yup.object().shape({
  username: yup.string().required('Please Enter your username'),
  email: yupEmail,
  phone: yup
    .string()
    .required('Please Enter your phone number')
    .matches(/^(\+84|0)*[1-9]\d{8}$/g, 'Phone number is not in the correct format'),
  password: yupPassword,
});
