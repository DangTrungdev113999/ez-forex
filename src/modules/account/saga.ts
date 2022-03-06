import { put, call, takeEvery } from 'redux-saga/effects';
import { UpdateUserInfoPayloadType, ChangePasswordloadType } from './models';
import {
  fetchUserInfo,
  fetchUserInfoSucceeded,
  fetchUserInfoError,
  updateUserInfo,
  updateUserInfoSucceeded,
  updateUserInfoError,
  changePassword,
  changePasswordSucceeded,
  changePasswordError,
  fetchAvatar,
  fetchAvatarSucceeded,
  fetchAvatarError,
  updateAvatar,
  updateAvatarSucceeded,
  updateAvatarError,
} from './slice';
import {
  fetchUserInfoApi,
  updateUserInfoApi,
  changePasswordApi,
  fetchAvatarApi,
  updateAvatarApi,
} from './apis';
import { CallbackInPlayloadType } from '~/common';
import { showToastError, showToastSuccess } from '~/utils';

function* fetchUserInfoEffect({ payload }: { payload: CallbackInPlayloadType }): unknown {
  try {
    const response = yield call(fetchUserInfoApi);
    yield put(fetchUserInfoSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchUserInfoError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* updateUserInfoEffect({ payload }: { payload: UpdateUserInfoPayloadType }): unknown {
  try {
    const response = yield call(updateUserInfoApi, payload.data);
    yield put(updateUserInfoSucceeded(response));
    showToastSuccess({
      message: response?.message || 'Update phone number successfully',
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(updateUserInfoError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* changePasswordEffect({ payload }: { payload: ChangePasswordloadType }): unknown {
  try {
    const response = yield call(changePasswordApi, payload.data);
    yield put(changePasswordSucceeded(response));
    showToastSuccess({
      message: response?.message || 'Update password successfully',
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(changePasswordError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchAvatarEffect({ payload }: { payload: CallbackInPlayloadType }): unknown {
  try {
    const response = yield call(fetchAvatarApi);
    yield put(fetchAvatarSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchAvatarError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* updateAvatarEffect({ payload }: { payload: CallbackInPlayloadType }): unknown {
  try {
    const response = yield call(updateAvatarApi, data.payload);
    yield put(updateAvatarSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(updateAvatarError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* accountSaga() {
  yield takeEvery(fetchUserInfo.type as any, fetchUserInfoEffect);
  yield takeEvery(updateUserInfo.type as any, updateUserInfoEffect);
  yield takeEvery(changePassword.type as any, changePasswordEffect);
  yield takeEvery(fetchAvatar.type as any, fetchAvatarEffect);
  yield takeEvery(updateAvatar.type as any, updateAvatarEffect);
}
