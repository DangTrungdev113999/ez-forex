import { put, call, select, takeEvery } from 'redux-saga/effects';
import {
  fetchHistories,
  fetchHistoriesSucceeded,
  fetchHistoriesError,
  saveIsTheFirstOpenHistory,
} from './slice';
import { fetchHistoriesApi } from './apis';
import { isTheFirstOpenHistorySelecter } from './selectors';

function* fetchHistoriesEffect({ payload }): unknown {
  try {
    const response = yield call(fetchHistoriesApi);
    yield put(fetchHistoriesSucceeded(response));

    const isTheFirstOpenHistory = yield select(isTheFirstOpenHistorySelecter);
    if (isTheFirstOpenHistory) {
      yield put(saveIsTheFirstOpenHistory(false));
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchHistoriesError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* accountSaga() {
  yield takeEvery(fetchHistories.type as any, fetchHistoriesEffect);
}
