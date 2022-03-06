/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AccountStateType } from './models';

const initialState: AccountStateType = {
  userInfo: {
    id: null,
    username: '',
    phone: '',
    email: '',
    packageName: '',
  },
  countries: [],

  fetchUserInfoLoading: false,

  updateUserInfoLoading: false,

  changePasswordLoading: false,

  fetchAvatarLoading: false,

  updateAvatarLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    fetchUserInfo: (state, action) => {
      state.fetchUserInfoLoading = true;
    },
    fetchUserInfoSucceeded: (state, action) => {
      state.fetchUserInfoLoading = false;
      state.userInfo = action.payload;
    },
    fetchUserInfoError: (state, action) => {
      state.fetchUserInfoLoading = false;
    },

    updateUserInfo: (state, action) => {
      state.updateUserInfoLoading = true;
    },
    updateUserInfoSucceeded: (state, action) => {
      state.updateUserInfoLoading = false;
    },
    updateUserInfoError: (state, action) => {
      state.updateUserInfoLoading = false;
    },

    changePassword: (state, action) => {
      state.changePasswordLoading = true;
    },
    changePasswordSucceeded: (state, action) => {
      state.changePasswordLoading = false;
    },
    changePasswordError: (state, action) => {
      state.changePasswordLoading = false;
    },

    fetchAvatar: (state, action) => {
      state.fetchAvatarLoading = true;
    },
    fetchAvatarSucceeded: (state, action) => {
      state.fetchAvatarLoading = false;
    },
    fetchAvatarError: (state, action) => {
      state.fetchAvatarLoading = false;
    },

    updateAvatar: (state, action) => {
      state.updateAvatarLoading = true;
    },
    updateAvatarSucceeded: (state, action) => {
      state.updateAvatarLoading = false;
    },
    updateAvatarError: (state, action) => {
      state.updateAvatarLoading = false;
    },

    saveEmail: (state, action) => {
      state.userInfo.email = action.payload;
    },

    saveCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

const { actions, reducer } = accountSlice;

export const {
  fetchUserInfo,
  fetchUserInfoSucceeded,
  fetchUserInfoError,

  updateUserInfo,
  updateUserInfoSucceeded,
  updateUserInfoError,

  changePassword,
  changePasswordSucceeded,
  changePasswordError,

  fetchAvatar,
  fetchAvatarSucceeded,
  fetchAvatarError,

  updateAvatar,
  updateAvatarSucceeded,
  updateAvatarError,

  saveEmail,
  saveCountries,
} = actions;

export default reducer;
