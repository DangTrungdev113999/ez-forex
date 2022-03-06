import baseApi from '~/common/baseApi';

export function fetchPackagesApi() {
  return baseApi.getApi('user/listPackage');
}

export function updatePackageApi({ packageName }) {
  return baseApi.putApi('user/upgradePlan', {
    packageName,
  });
}
