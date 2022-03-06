import baseApi from '~/common/baseApi';
import { ChangePasswordType, UpdateUserInfoType } from './models';

export function fetchUserInfoApi() {
  return baseApi.getApi('/user/me');
}

export function updateUserInfoApi({ phone }: UpdateUserInfoType) {
  return baseApi.putApi('/user/changePhoneNumber', {
    phone,
  });
}

export function changePasswordApi({
  currentPassword,
  newPassword,
  passwordConfirm,
}: ChangePasswordType) {
  return baseApi.putApi('/user/changePassword', {
    currentPassword,
    newPassword,
    passwordConfirm,
  });
}

export function fetchAvatarApi() {
  return baseApi.getApi('/files/maxresdefault.jpg');
}

export function updateAvatarApi(file) {
  return baseApi.postFormData('/upload', {
    file,
  });
}
