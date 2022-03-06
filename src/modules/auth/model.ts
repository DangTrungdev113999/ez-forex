import { CallbackInPlayloadType } from '~/common/modals';

export type LogInDataType = {
  email: string;
  password: string;
  firebaseToken: string;
};

export type SignUpDataType = {
  username: string;
  email: string;
  phone: string | number;
  password: string;
  firebaseToken: string;
};

export type LogInPayloadType = CallbackInPlayloadType & {
  data: LogInDataType;
};

export type SignUpPayloadType = CallbackInPlayloadType & {
  data: SignUpDataType;
};

export type AuthStateType = {
  token: string;
  logInWithEmailLoading: boolean;

  firebaseToken: string;
  signUpLoading: boolean;
};
