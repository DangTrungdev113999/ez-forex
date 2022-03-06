import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';
import {
  fetchWathlist,
  fetchWathlistSucceeded,
  fetchWathlistError,
  fetchAllWathlist,
  fetchAllWathlistSucceeded,
  fetchAllWathlistError,
  loadmoreAllWatchList,
  loadmoreAllWatchListSucceeded,
  loadmoreAllWatchListFailed,
  updateWathlist,
  updateWathlistSucceeded,
  updateWathlistError,
  removeWathlist,
  removeWathlistSucceeded,
  removeWathlistError,
  fetchDiscoverAlert,
  fetchDiscoverAlertSucceeded,
  fetchDiscoverAlertError,
  fetchConditions,
  fetchConditionsSucceeded,
  fetchConditionsError,
  fetchIndicators,
  fetchIndicatorsSucceeded,
  fetchIndicatorsError,
  fetchTimeFrames,
  fetchTimeFramesSucceeded,
  fetchTimeFramesError,
  savaIsTheFirstOpenAlertTab,
  updateDiscoverAlert,
  updateDiscoverAlertSucceeded,
  updateDiscoverAlertError,
  fetchAllAlert,
  fetchAllAlertSucceeded,
  fetchAllAlertError,
  savaIsTheFirstOpenAlertChannelScreen,
  removeAlertChannel,
  removeAlertChannelSucceeded,
  removeAlertChannelError,
  fetchAllTimeFrame,
  fetchAllTimeFrameSucceeded,
  fetchAllTimeFrameError,
  fetchAllMethod,
  fetchAllMethodSucceeded,
  fetchAllMethodError,
  fetchAlertsHistory,
  fetchAlertsHistorySucceeded,
  fetchAlertsHistoryError,
  savaIsTheFirstAlertsHistoryScreen,
  toggleNotification,
  toggleNotificationSucceeded,
  toggleNotificationError,
} from './slice';
import {
  fetchWathlistApi,
  fetchAllWathlistApi,
  loadmoreAllWathlistApi,
  updateAllWathlistApi,
  removeAllWathlistApi,
  fetchDiscoverAlertApi,
  fetchConditionsApi,
  fetchIndicatorsApi,
  fetchTimeFramesApi,
  updateDiscoverAlertApi,
  fetchAllAlertApi,
  removeAlertApi,
  fetchAllTimeFrameApi,
  fetchAllMethodApi,
  fetchAlertsHistoryApi,
  toggleNotificationApi,
} from './apis';
import { showToastError, showToastSuccess } from '~/utils';
import {
  allWatchListPageSelector,
  isTheFirstAlertsHistoryScreenSelector,
  isTheFirstOpenAlertChannelScreenSelector,
} from './selectors';
import { isTheFirstOpenAlertTabSelector } from '~/modules/alert/selectors';

function* fetchWathlistSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchWathlistApi);
    yield put(fetchWathlistSucceeded(response));
    const isTheFirstOpenAlertTab = yield select(isTheFirstOpenAlertTabSelector);
    if (isTheFirstOpenAlertTab.watchlistTab) {
      yield put(
        savaIsTheFirstOpenAlertTab({
          watchlistTab: false,
        }),
      );
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchWathlistError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchAllWathlistSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchAllWathlistApi);
    yield put(fetchAllWathlistSucceeded(response));

    const isTheFirstOpenAlertTab = yield select(isTheFirstOpenAlertTabSelector);
    if (isTheFirstOpenAlertTab.addWathlistScreen) {
      yield put(
        savaIsTheFirstOpenAlertTab({
          addWathlistScreen: false,
        }),
      );
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchAllWathlistError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* loadmoreAllWathlistSideEffect({ payload }: { payload: any }): unknown {
  try {
    const page = yield select(allWatchListPageSelector);
    const response = yield call(loadmoreAllWathlistApi, {
      page: page + 1,
    });
    yield put(loadmoreAllWatchListSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(loadmoreAllWatchListFailed(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* updateWathlistSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(updateAllWathlistApi, payload.data);
    yield put(updateWathlistSucceeded(response));
    yield put(fetchWathlist({}));
    showToastSuccess({
      message: response?.message || 'Add watchlist successfully',
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(updateWathlistError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* removeWathlistSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(removeAllWathlistApi, payload.data);

    yield put(fetchWathlist({}));
    yield put(removeWathlistSucceeded(response));

    showToastSuccess({
      message: response?.message || 'Remove watchlist successfully',
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(removeWathlistError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchDiscoverAlertSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchDiscoverAlertApi, payload.data);

    yield put(fetchDiscoverAlertSucceeded(response));
    const isTheFirstOpenAlertTab = yield select(isTheFirstOpenAlertTabSelector);
    if (isTheFirstOpenAlertTab.discoverTab) {
      yield put(
        savaIsTheFirstOpenAlertTab({
          discoverTab: false,
        }),
      );
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchDiscoverAlertError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchConditionsSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchConditionsApi, payload.data);

    yield put(fetchConditionsSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchConditionsError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchIndicatorsSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchIndicatorsApi, payload.data);

    yield put(fetchIndicatorsSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchIndicatorsError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchTimeFramesSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchTimeFramesApi, payload.data);

    yield put(fetchTimeFramesSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchTimeFramesError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* updateDiscoverAlertSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(updateDiscoverAlertApi, payload.data);
    yield put(
      fetchAllAlert({
        data: {
          pairsId: payload.data.pairId,
          timeFrame: 'ALL',
          method: 'ALL',
        },
      }),
    );
    yield put(updateDiscoverAlertSucceeded(response));
    showToastSuccess({
      message: response?.message || 'Update discover alert successfully',
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(updateDiscoverAlertError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchAllAlertSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchAllAlertApi, payload.data);
    yield put(fetchAllAlertSucceeded(response));
    const isTheFirstOpenAlertChannelScreen = yield select(isTheFirstOpenAlertChannelScreenSelector);
    if (isTheFirstOpenAlertChannelScreen) {
      yield put(savaIsTheFirstOpenAlertChannelScreen(false));
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchAllAlertError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* removeAlertChannelSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(removeAlertApi, payload.data);

    yield put(
      fetchAllAlert({
        data: {
          pairsId: payload.data.pairsId,
          timeFrame: 'ALL',
          method: 'ALL',
        },
      }),
    );
    yield put(removeAlertChannelSucceeded(response));
    showToastSuccess({
      message: response?.message || 'Remove watchlist successfully',
    });
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(removeAlertChannelError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchAllTimeFrameSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchAllTimeFrameApi);

    yield put(fetchAllTimeFrameSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchAllTimeFrameError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchAllMethodSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchAllMethodApi);

    yield put(fetchAllMethodSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchAllMethodError(error));
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* fetchAlertsHistorySideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(fetchAlertsHistoryApi, payload.data);
    yield put(fetchAlertsHistorySucceeded(response));
    const isTheFirstAlertsHistoryScreen = yield select(isTheFirstAlertsHistoryScreenSelector);
    if (isTheFirstAlertsHistoryScreen) {
      yield put(savaIsTheFirstAlertsHistoryScreen(false));
    }
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(fetchAlertsHistoryError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

function* toggleNotificationSideEffect({ payload }: { payload: any }): unknown {
  try {
    const response = yield call(toggleNotificationApi, payload.data);

    yield put(toggleNotificationSucceeded(response));
    if (payload.onSuccess) yield call(payload.onSuccess, response);
  } catch (error) {
    yield put(toggleNotificationError(error));
    showToastError({
      message: error.errorMessage,
    });
    if (payload.onError) yield call(payload.onError, error);
  }
}

export default function* accountSaga() {
  yield takeLatest(fetchWathlist.type as any, fetchWathlistSideEffect);
  yield takeEvery(fetchAllWathlist.type as any, fetchAllWathlistSideEffect);
  yield takeEvery(loadmoreAllWatchList.type as any, loadmoreAllWathlistSideEffect);
  yield takeEvery(updateWathlist.type as any, updateWathlistSideEffect);
  yield takeEvery(removeWathlist.type as any, removeWathlistSideEffect);
  yield takeEvery(fetchDiscoverAlert.type as any, fetchDiscoverAlertSideEffect);
  yield takeEvery(fetchConditions.type as any, fetchConditionsSideEffect);
  yield takeEvery(fetchIndicators.type as any, fetchIndicatorsSideEffect);
  yield takeEvery(fetchTimeFrames.type as any, fetchTimeFramesSideEffect);
  yield takeEvery(updateDiscoverAlert.type as any, updateDiscoverAlertSideEffect);
  yield takeEvery(fetchAllAlert.type as any, fetchAllAlertSideEffect);
  yield takeEvery(removeAlertChannel.type as any, removeAlertChannelSideEffect);
  yield takeEvery(fetchAllTimeFrame.type as any, fetchAllTimeFrameSideEffect);
  yield takeEvery(fetchAllMethod.type as any, fetchAllMethodSideEffect);
  yield takeEvery(fetchAlertsHistory.type as any, fetchAlertsHistorySideEffect);
  yield takeEvery(toggleNotification.type as any, toggleNotificationSideEffect);
}
