import baseApi from '~/common/baseApi';

export function fetchHistoriesApi() {
  return baseApi.getApi('/signals/history');
}
