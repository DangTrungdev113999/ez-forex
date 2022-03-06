import baseApi from '~/common/baseApi';

export function fetchPackagesApi() {
  return baseApi.getApi('/education');
}
