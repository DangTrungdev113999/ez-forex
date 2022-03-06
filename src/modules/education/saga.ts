import { put, call, select, takeEvery } from 'redux-saga/effects';
import { fetchEducations, fetchEducationsSucceeded, fetchEducationsError } from './slice';
import { fetchPackagesApi } from './apis';
import { isTheFirstOpenEducationSelecter } from './selectors';
import { saveIsTheFirstOpenEducation } from '~/modules/education/slice';

function* fetchEducationsEffect({ payload }): unknown {
  try {
    const response = yield call(fetchPackagesApi);
    yield put(fetchEducationsSucceeded(response));

    const isTheFirstOpenEducation = yield select(isTheFirstOpenEducationSelecter);
    if (isTheFirstOpenEducation) {
      yield put(saveIsTheFirstOpenEducation(false));
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchEducationsError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* accountSaga() {
  yield takeEvery(fetchEducations.type as any, fetchEducationsEffect);
}
