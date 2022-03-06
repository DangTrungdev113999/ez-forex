import { ALL_WATH_LIST_SIZE } from '~/common';
import baseApi from '~/common/baseApi';

export function fetchWathlistApi() {
  return baseApi.getApi('/watch-list');
}

export function fetchAllWathlistApi() {
  return baseApi.getApi('/watch-list/get-all', {
    page: 0,
    size: ALL_WATH_LIST_SIZE,
  });
}

export function loadmoreAllWathlistApi({ page }: { page: number }) {
  return baseApi.getApi('/watch-list/get-all', {
    page,
    size: ALL_WATH_LIST_SIZE,
  });
}

export function updateAllWathlistApi({ watchLists }: { watchLists: string[] }) {
  return baseApi.putApi('/watch-list', {
    watchLists,
  });
}

export function removeAllWathlistApi({ watchLists }: { watchLists: string[] }) {
  return baseApi.putApi('/watch-list/remove', {
    watchLists,
  });
}

export function fetchDiscoverAlertApi({ searchText = '' }: { searchText: string }) {
  return baseApi.getApi('/discover-alert', {
    searchText,
  });
}

export function fetchConditionsApi({ methodId }: { methodId: number }) {
  return baseApi.getApi(`/discover-alert/${methodId}/get-condition`);
}

export function fetchIndicatorsApi({ methodId }: { methodId: number }) {
  return baseApi.getApi(`/discover-alert/${methodId}/get-indicator`);
}

export function fetchTimeFramesApi({ methodId }: { methodId: number }) {
  return baseApi.getApi(`/discover-alert/${methodId}/get-time-frame`);
}

export function updateDiscoverAlertApi({
  pairId,
  methodId,
  timeFrameId,
  indicator,
  conditionAlert,
}: {
  pairId: number;
  methodId: number;
  timeFrameId: number;
  indicator: string[];
  conditionAlert: string[];
}) {
  return baseApi.postApi('/discover-alert/subscribe', {
    pairId,
    methodId,
    timeFrameId,
    indicator,
    conditionAlert,
  });
}

export function fetchAllAlertApi({
  pairsId,
  timeFrame = 'ALL',
  method = 'ALL',
}: {
  pairsId: number | string;
  timeFrame: string;
  method: string;
}) {
  return baseApi.getApi(`/watch-list/alert/${pairsId}`, {
    timeFrame,
    method,
  });
}

export function removeAlertApi({ alertsId }: { alertsId: string }) {
  return baseApi.putApi(`/watch-list/alert/remove`, {
    ids: alertsId,
  });
}

export function fetchAllTimeFrameApi() {
  return baseApi.getApi('watch-list/alert/timeFrame');
}

export function fetchAllMethodApi() {
  return baseApi.getApi('/watch-list/alert/method');
}

export function fetchAlertsHistoryApi({
  pairId,
  timeFrameId,
  methodId,
}: {
  pairId: string;
  timeFrameId: string;
  methodId: string;
}) {
  return baseApi.getApi(`/watch-list/alert/${methodId}/${timeFrameId}/${pairId}`);
}

export function toggleNotificationApi({
  alertId,
  isActive,
}: {
  alertId: number | string;
  isActive: string;
}) {
  return baseApi.putApi(`/watch-list/alert/${alertId}?isActive=${isActive}`, {
    isActive,
  });
}
