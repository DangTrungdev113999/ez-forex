import { put, call, takeEvery } from 'redux-saga/effects';
import {
  logInWithEmail,
  logInWithEmailSucceeded,
  logInWithEmailFailed,
  signUp,
  signUpSucceeded,
  signUpFailed,
} from './slice';

import { logInWithEmailApi, signUpApi } from './apis';
import { LogInPayloadType, SignUpPayloadType } from './model';
import { saveEmail } from '../account/slice';
import { showToastError, showToastSuccess } from '~/utils';

function* logIpWithEmailSideEffect({ payload }: { payload: LogInPayloadType }): unknown {
  try {
    const response = yield call(logInWithEmailApi, payload.data);
    yield put(logInWithEmailSucceeded(response));
    yield put(saveEmail(payload.data.email));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(logInWithEmailFailed(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* SignUpSideEffect({ payload }: { payload: SignUpPayloadType }): unknown {
  try {
    const response = yield call(signUpApi, payload.data);
    yield put(signUpSucceeded(response));
    yield put(saveEmail(payload.data.email));
    showToastSuccess({
      message: 'Sign Up successfully',
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(signUpFailed(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* authSaga() {
  yield takeEvery(logInWithEmail.type as any, logIpWithEmailSideEffect);
  yield takeEvery(signUp.type as any, SignUpSideEffect);
}
