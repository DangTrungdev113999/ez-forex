import { LogInDataType, SignUpDataType } from './model';
import baseApi from '~/common/baseApi';

export function logInWithEmailApi({ email, password, firebaseToken }: LogInDataType) {
  return baseApi.postApi('/auth/signin', {
    usernameOrEmail: email,
    password,
    firebaseToken,
  });
}
export function signUpApi({ username, email, phone, password, firebaseToken }: SignUpDataType) {
  return baseApi.postApi('/auth/signup', {
    username,
    email,
    phone,
    password,
  });
}
