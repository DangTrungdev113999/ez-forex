/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AlertStateType } from './model';

const initialState: AlertStateType = {
  wathlist: [],
  fetchWathlistLoading: false,

  allWatchList: [],
  fetchAllWathlistLoading: false,

  allWatchListPage: 0,
  loadMoreAllWatchListNoMore: false,
  loadmoreAllWatchListLoading: false,

  updateWathlistLoading: false,

  removeWathlistLoading: false,

  discoverAlert: {},
  discoverAlertType: ['All'],
  fetchDiscoverAlertLoading: false,

  conditions: [],
  fetchConditionsLoading: false,

  indicators: [],
  fetchIndicatorsLoading: false,

  timeFrames: [],
  fetchTimeFramesLoading: false,

  updateDiscoverAlertLoading: false,

  subscribeAlert: {
    pair: null,
    timeFrame: null,
    indicatorAlert: '',
    conditionAlert: '',
  },

  isTheFirstOpenAlertTab: {
    watchlistTab: true,
    discoverTab: true,
    addWathlistScreen: true,
  },

  allAlert: [],
  fetchAllAlertLoading: false,
  isTheFirstOpenAlertChannelScreen: true,

  removeAlertChannelLoading: false,

  allTimeFrame: [],
  fetchAllTimeFrameLoading: false,

  allMethod: [],
  fetchAllMethodLoading: false,

  alertsHistory: [],
  fetchAlertsHistoryLoading: false,
  isTheFirstAlertsHistoryScreen: true,

  toggleNotificationLoading: false,
};

const authSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    fetchWathlist: (state, action) => {
      state.fetchWathlistLoading = true;
    },
    fetchWathlistSucceeded: (state, action) => {
      state.fetchWathlistLoading = false;
      state.wathlist = action.payload || [];
    },
    fetchWathlistError: (state, action) => {
      state.fetchWathlistLoading = false;
    },

    fetchAllWathlist: (state, action) => {
      state.fetchAllWathlistLoading = true;
    },
    fetchAllWathlistSucceeded: (state, action) => {
      state.fetchAllWathlistLoading = false;
      state.allWatchList = action.payload?.content || [];
    },
    fetchAllWathlistError: (state, action) => {
      state.fetchAllWathlistLoading = false;
    },

    loadmoreAllWatchList: (state, action) => {
      state.loadmoreAllWatchListLoading = true;
    },
    loadmoreAllWatchListSucceeded: (state, action) => {
      state.loadmoreAllWatchListLoading = false;
      state.allWatchList.push(...(action.payload?.content || []));
      state.allWatchListPage =
        action.payload?.content?.length > 0 ? state.allWatchListPage + 1 : state.allWatchListPage;
      state.loadMoreAllWatchListNoMore = !(action.payload?.content?.length > 0);
    },
    loadmoreAllWatchListFailed: (state, action) => {
      state.loadmoreAllWatchListLoading = false;
    },

    updateWathlist: (state, action) => {
      state.updateWathlistLoading = true;
    },
    updateWathlistSucceeded: (state, action) => {
      state.updateWathlistLoading = false;
    },
    updateWathlistError: (state, action) => {
      state.updateWathlistLoading = false;
    },

    removeWathlist: (state, action) => {
      state.removeWathlistLoading = true;
    },
    removeWathlistSucceeded: (state, action) => {
      state.removeWathlistLoading = false;
    },
    removeWathlistError: (state, action) => {
      state.removeWathlistLoading = false;
    },

    fetchDiscoverAlert: (state, action) => {
      state.fetchDiscoverAlertLoading = true;
    },
    fetchDiscoverAlertSucceeded: (state, action) => {
      state.discoverAlert = action.payload;
      if (
        state.discoverAlertType.length === 1 ||
        Object.keys(action.payload).length + 1 > state.discoverAlertType.length
      ) {
        state.discoverAlertType = state.discoverAlertType.concat(Object.keys(action.payload));
      }
      state.fetchDiscoverAlertLoading = false;
    },
    fetchDiscoverAlertError: (state, action) => {
      state.fetchDiscoverAlertLoading = false;
    },

    fetchConditions: (state, action) => {
      state.fetchConditionsLoading = true;
    },
    fetchConditionsSucceeded: (state, action) => {
      state.conditions = action.payload;
      state.fetchConditionsLoading = false;
    },
    fetchConditionsError: (state, action) => {
      state.fetchConditionsLoading = false;
    },

    fetchIndicators: (state, action) => {
      state.fetchIndicatorsLoading = true;
    },
    fetchIndicatorsSucceeded: (state, action) => {
      state.indicators = action.payload;
      state.fetchIndicatorsLoading = false;
    },
    fetchIndicatorsError: (state, action) => {
      state.fetchIndicatorsLoading = false;
    },

    fetchTimeFrames: (state, action) => {
      state.fetchTimeFramesLoading = true;
    },
    fetchTimeFramesSucceeded: (state, action) => {
      state.timeFrames = action.payload;
      state.fetchTimeFramesLoading = false;
    },
    fetchTimeFramesError: (state, action) => {
      state.fetchTimeFramesLoading = false;
    },

    updateDiscoverAlert: (state, action) => {
      state.updateDiscoverAlertLoading = true;
    },
    updateDiscoverAlertSucceeded: (state, action) => {
      state.updateDiscoverAlertLoading = false;
    },
    updateDiscoverAlertError: (state, action) => {
      state.updateDiscoverAlertLoading = false;
    },

    saveSubscribeAlert: (state, action) => {
      state.subscribeAlert = {
        ...state.subscribeAlert,
        ...action.payload,
      };
    },

    savaIsTheFirstOpenAlertTab: (state, action) => {
      state.isTheFirstOpenAlertTab = {
        ...state.isTheFirstOpenAlertTab,
        ...action.payload,
      };
    },

    fetchAllAlert: (state, action) => {
      state.fetchAllAlertLoading = true;
    },
    fetchAllAlertSucceeded: (state, action) => {
      state.fetchAllAlertLoading = false;
      state.allAlert = Object.keys(action.payload).map(channel => ({
        id: action.payload[channel]?.alertId,
        name: channel,
        ...action.payload[channel],
      }));
    },
    fetchAllAlertError: (state, action) => {
      state.fetchAllAlertLoading = false;
    },
    savaIsTheFirstOpenAlertChannelScreen: (state, action) => {
      state.isTheFirstOpenAlertChannelScreen = action.payload;
    },

    removeAlertChannel: (state, action) => {
      state.removeAlertChannelLoading = true;
    },
    removeAlertChannelSucceeded: (state, action) => {
      state.removeAlertChannelLoading = false;
    },
    removeAlertChannelError: (state, action) => {
      state.removeAlertChannelLoading = false;
    },

    fetchAllTimeFrame: (state, action) => {
      state.fetchAllTimeFrameLoading = true;
    },
    fetchAllTimeFrameSucceeded: (state, action) => {
      state.fetchAllTimeFrameLoading = false;
      state.allTimeFrame = action.payload || [];
    },
    fetchAllTimeFrameError: (state, action) => {
      state.fetchAllTimeFrameLoading = false;
    },

    fetchAllMethod: (state, action) => {
      state.fetchAllMethodLoading = true;
    },
    fetchAllMethodSucceeded: (state, action) => {
      state.fetchAllMethodLoading = false;
      state.allMethod = action.payload || [];
    },
    fetchAllMethodError: (state, action) => {
      state.fetchAllMethodLoading = false;
    },

    fetchAlertsHistory: (state, action) => {
      state.fetchAlertsHistoryLoading = true;
    },
    fetchAlertsHistorySucceeded: (state, action) => {
      state.fetchAlertsHistoryLoading = false;
      state.alertsHistory = action.payload || [];
    },
    fetchAlertsHistoryError: (state, action) => {
      state.fetchAlertsHistoryLoading = false;
    },

    savaIsTheFirstAlertsHistoryScreen: (state, action) => {
      state.isTheFirstAlertsHistoryScreen = action.payload;
    },

    toggleNotification: (state, action) => {
      state.toggleNotificationLoading = true;
      const index = state.allAlert.findIndex(item => item.id === action.payload.data.alertId);

      console.log({ index });

      if (index !== -1) {
        state.allAlert[index].isActive = !state.allAlert[index].isActive;
      }
    },
    toggleNotificationSucceeded: (state, action) => {
      state.toggleNotificationLoading = false;
    },
    toggleNotificationError: (state, action) => {
      state.toggleNotificationLoading = false;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
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

  updateDiscoverAlert,
  updateDiscoverAlertSucceeded,
  updateDiscoverAlertError,

  saveSubscribeAlert,

  savaIsTheFirstOpenAlertTab,

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
} = actions;

export default reducer;
