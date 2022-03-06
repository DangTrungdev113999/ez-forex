import { put, call, select, takeEvery } from 'redux-saga/effects';
import { fetchSignals, fetchSignalsSucceeded, fetchSignalsError } from './slice';
import { fetchSignalsApi } from './apis';
import { CallbackInPlayloadType } from '~/common';
import { isTheFirstOpenTabSignalSelector } from '~/modules/signal/selectors';
import { savaIsTheFirstOpenTabSignal } from '~/modules/signal/slice';

function* fetchSignalsEffect({ payload }: { payload: CallbackInPlayloadType }): unknown {
  try {
    const response = yield call(fetchSignalsApi);
    yield put(fetchSignalsSucceeded(response));

    const isTheFirstOpenTabSignal = yield select(isTheFirstOpenTabSignalSelector);
    if (isTheFirstOpenTabSignal) {
      yield put(savaIsTheFirstOpenTabSignal(false));
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchSignalsError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* signalSaga() {
  yield takeEvery(fetchSignals.type as any, fetchSignalsEffect);
}
