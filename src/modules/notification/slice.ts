/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { NotificationStateType } from './model';

const initialState: NotificationStateType = {
  notifications: [],
  fetchNotificationsLoading: false,

  isTheFirstOpenNotification: true,
};

const Notificationlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    fetchNotifications: (state, action) => {
      state.fetchNotificationsLoading = true;
    },
    fetchNotificationsSucceeded: (state, action) => {
      state.fetchNotificationsLoading = false;
      state.notifications = action.payload;
    },
    fetchNotificationsError: (state, action) => {
      state.fetchNotificationsLoading = false;
    },

    saveIsTheFirstOpenNotification: (state, action) => {
      state.isTheFirstOpenNotification = action.payload;
    },
  },
});

const { actions, reducer } = Notificationlice;

export const {
  fetchNotifications,
  fetchNotificationsSucceeded,
  fetchNotificationsError,
  saveIsTheFirstOpenNotification,
} = actions;

export default reducer;
