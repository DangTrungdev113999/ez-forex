import { put, call, select, takeEvery } from 'redux-saga/effects';
import {
  fetchNotifications,
  fetchNotificationsSucceeded,
  fetchNotificationsError,
  saveIsTheFirstOpenNotification,
} from './slice';
import { fetchNotificationsApi } from './apis';
import { isTheFirstOpenNotificationSelecter } from './selectors';

function* fetchNotificationsEffect({ payload }): unknown {
  try {
    const response = yield call(fetchNotificationsApi);
    yield put(fetchNotificationsSucceeded(response));

    const isTheFirstOpenNotification = yield select(isTheFirstOpenNotificationSelecter);
    if (isTheFirstOpenNotification) {
      yield put(saveIsTheFirstOpenNotification(false));
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchNotificationsError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* accountSaga() {
  yield takeEvery(fetchNotifications.type as any, fetchNotificationsEffect);
}
