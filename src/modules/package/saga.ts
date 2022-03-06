import { put, call, takeEvery, select } from 'redux-saga/effects';
import {
  fetchPackages,
  fetchPackagesSucceeded,
  fetchPackagesError,
  updatePackages,
  updatePackagesSucceeded,
  updatePackagesError,
} from './slice';
import { fetchPackagesApi, updatePackageApi } from './apis';
import { showToastError, showToastSuccess } from '~/utils';
import { fetchUserInfo } from '~/modules/account/slice';
import { saveIsTheFirstOpenPackage } from '~/modules/package/slice';
import { isTheFirstOpenPackageSelecter } from './selectors';

function* fetchPackagesEffect({ payload }): unknown {
  try {
    const response = yield call(fetchPackagesApi);
    yield put(fetchPackagesSucceeded(response));
    const isTheFirstOpenPackage = yield select(isTheFirstOpenPackageSelecter);
    if (isTheFirstOpenPackage) {
      yield put(saveIsTheFirstOpenPackage(false));
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchPackagesError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* updatePackageEffect({ payload }): unknown {
  try {
    const response = yield call(updatePackageApi, payload.data);
    yield put(updatePackagesSucceeded(response));
    yield put(fetchPackages({}));
    yield put(fetchUserInfo({}));
    showToastSuccess({
      message: response.message,
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(updatePackagesError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* accountSaga() {
  yield takeEvery(fetchPackages.type as any, fetchPackagesEffect);
  yield takeEvery(updatePackages.type as any, updatePackageEffect);
}
