import { CallbackInPlayloadType } from '~/common/modals';

export type UpdateUserInfoType = {
  phone: string | number;
};

export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
};

export type UpdateUserInfoPayloadType = CallbackInPlayloadType & {
  data: UpdateUserInfoType;
};

export type ChangePasswordloadType = CallbackInPlayloadType & {
  data: ChangePasswordType;
};

export type UserInfoType = {
  id: number | null;
  username: string;
  phone: string;
  email: string;
  packageName: string;
};

export type AccountStateType = {
  userInfo: UserInfoType;
  fetchUserInfoLoading: boolean;

  updateUserInfoLoading: boolean;

  changePasswordLoading: boolean;

  fetchAvatarLoading: boolean;

  updateAvatarLoading: boolean;

  countries: string[];
};
