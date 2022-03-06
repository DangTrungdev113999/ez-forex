import { createSelector } from 'reselect';

const alertSelector = state => state.alert;

export const wathlistSelector = createSelector(
  alertSelector,
  (_, keyword: string) => keyword,
  (alert, keyword) => {
    if (!keyword) {
      return alert?.wathlist;
    }

    return alert?.wathlist?.filter(item =>
      item?.pairs.toLocaleUpperCase().includes(keyword.toLocaleUpperCase()),
    );
  },
);

export const fetchWathlistLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchWathlistLoading,
);

export const allWatchListSelector = createSelector(alertSelector, alert => alert.allWatchList);
export const fetchAllWathlistLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchAllWathlistLoading,
);

export const allWatchListPageSelector = createSelector(
  alertSelector,
  alert => alert.allWatchListPage,
);
export const loadMoreAllWatchListNoMoreSelector = createSelector(
  alertSelector,
  alert => alert.loadMoreAllWatchListNoMore,
);
export const loadmoreAllWatchListLoadingSelector = createSelector(
  alertSelector,
  alert => alert.loadmoreAllWatchListLoading,
);

export const updateWathlistLoadingSelector = createSelector(
  alertSelector,
  alert => alert.updateWathlistLoading,
);

export const removeWathlistLoadingSelector = createSelector(
  alertSelector,
  alert => alert.removeWathlistLoading,
);

export const isTheFirstOpenAlertTabSelector = createSelector(
  alertSelector,
  alert => alert.isTheFirstOpenAlertTab,
);

export const discoverAlertSelector = createSelector(
  alertSelector,
  (_, type: string) => type,
  (alert, type) => {
    if (type !== 'All' && alert.discoverAlert[type] && alert.discoverAlert) {
      return {
        [type]: alert.discoverAlert[type],
      };
    }

    return alert.discoverAlert;
  },
);
export const discoverAlertTypeSelector = createSelector(
  alertSelector,
  alert => alert.discoverAlertType,
);

export const fetchDiscoverAlertLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchDiscoverAlertLoading,
);

export const conditionsSelector = createSelector(alertSelector, alert => alert.conditions);
export const fetchConditionsLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchConditionsLoading,
);

export const indicatorsSelector = createSelector(alertSelector, alert => alert.indicators);
export const fetchIndicatorsLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchIndicatorsLoading,
);

export const timeFramesSelector = createSelector(alertSelector, alert => alert.timeFrames);
export const fetchTimeFramesLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchTimeFramesLoading,
);

export const subscribeAlertDataSelector = createSelector(
  alertSelector,
  alert => alert.subscribeAlert,
);

export const updateDiscoverAlertLoadingSelector = createSelector(
  alertSelector,
  alert => alert.updateDiscoverAlertLoading,
);

export const allAlertSelector = createSelector(alertSelector, alert => alert.allAlert);
export const fetchAllAlertLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchAllAlertLoading,
);
export const isTheFirstOpenAlertChannelScreenSelector = createSelector(
  alertSelector,
  alert => alert.isTheFirstOpenAlertChannelScreen,
);

export const removeAlertChannelLoadingSelector = createSelector(
  alertSelector,
  alert => alert.removeAlertChannelLoading,
);

export const allTimeFrameSelector = createSelector(alertSelector, alert => alert.allTimeFrame);
export const fetchAllTimeFrameLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchAllTimeFrameLoading,
);

export const allMethodSelector = createSelector(alertSelector, alert => alert.allMethod);
export const fetchAllMethodLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchAllMethodLoading,
);

export const alertsHistorySelector = createSelector(alertSelector, alert => alert.alertsHistory);
export const fetchAlertsHistoryLoadingSelector = createSelector(
  alertSelector,
  alert => alert.fetchAlertsHistoryLoading,
);
export const isTheFirstAlertsHistoryScreenSelector = createSelector(
  alertSelector,
  alert => alert.isTheFirstAlertsHistoryScreen,
);

export const toggleNotificationLoadingScreenSelector = createSelector(
  alertSelector,
  alert => alert.toggleNotificationLoadingScreen,
);
