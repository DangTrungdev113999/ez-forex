import { createSlice } from '@reduxjs/toolkit';

/* eslint-disable no-param-reassign */
import { AuthStateType } from './model';

const initialState: AuthStateType = {
  token: '',
  logInWithEmailLoading: false,

  firebaseToken: '',
  signUpLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logInWithEmail: (state, action) => {
      state.logInWithEmailLoading = true;
    },
    logInWithEmailSucceeded: (state, action) => {
      state.logInWithEmailLoading = false;
      state.token = action.payload?.accessToken || '';
    },
    logInWithEmailFailed: (state, action) => {
      state.logInWithEmailLoading = false;
    },

    signUp: (state, action) => {
      state.signUpLoading = true;
    },
    signUpSucceeded: (state, action) => {
      state.signUpLoading = false;
    },
    signUpFailed: (state, action) => {
      state.signUpLoading = false;
    },

    logOut: state => {
      state.token = '';
    },

    saveFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  logInWithEmail,
  logInWithEmailSucceeded,
  logInWithEmailFailed,
  signUp,
  signUpSucceeded,
  signUpFailed,
  logOut,
  saveFirebaseToken,
} = actions;

export default reducer;
