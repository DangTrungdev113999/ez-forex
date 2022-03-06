import baseApi from '~/common/baseApi';

export function fetchNotificationsApi() {
  return baseApi.getApi('/notification');
}

export function updateNumberNotiApi() {
  return baseApi.putApi('/user/updateNumberNoti', {});
}
